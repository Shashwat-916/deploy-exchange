import express from 'express';
import { prisma } from '@repo/prisma-db';
import redisClient from '@repo/redis-client';

const app = express();

app.post('/post', (req, res) => {
    res.send(" hello from worker backend ");
});

// Worker healthcheck route
app.get('/health', async (req, res) => {
    let dbStatus = "UP";
    let redisStatus = "UP";

    try {
        await prisma.$queryRaw`SELECT 1`;
    } catch {
        dbStatus = "DOWN";
    }

    try {
        await redisClient.ping();
    } catch {
        redisStatus = "DOWN";
    }

    res.json({
        status: (dbStatus === "UP" && redisStatus === "UP") ? "OK" : "ERROR",
        services: {
            database: dbStatus,
            redis: redisStatus
        }
    });
});

// Start express server on port 3002
app.listen(3002, () => {
    console.log('Worker HTTP healthcheck server is running on port 3002');
});

// background worker loop
async function startWorker() {
    console.log("Worker background processor started, waiting for submissions...");
    
    while (true) {
        try {
            // brPop blocks until a submission is pushed to the 'submissions' list
            // Timeout 0 means wait indefinitely
            const result = await redisClient.brPop('submissions', 0);
            
            if (result) {
                const { element } = result;
                const payload = JSON.parse(element);
                
                console.log(`[Worker] Received submission payload for user: ${payload.email}`);
                console.log(`[Worker] Fetching user details from Database for ID: ${payload.userId}...`);
                
                // Confirm user exists in DB
                const user = await prisma.user.findUnique({
                    where: { id: payload.userId }
                });

                if (user) {
                    console.log(`[Worker] Confirmed User exists. Processing logic for: ${user.email}`);
                    // Simulate task processing time (e.g., compile code, run tests, etc.)
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    console.log(`[Worker] Successfully processed submission for ${user.email}!`);
                } else {
                    console.error(`[Worker] User with ID ${payload.userId} not found in database.`);
                }
            }
        } catch (err: any) {
            console.error("[Worker Error]:", err.message);
            // Sleep for 5 seconds on connection failures to prevent infinite spam looping
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

// Launch background worker process
startWorker().catch((err) => {
    console.error("Critical worker crash:", err);
});