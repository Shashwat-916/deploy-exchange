import express from 'express';
import { prisma } from '@repo/prisma-db';
import redisClient from '@repo/redis-client';

const app = express();
app.use(express.json());

// Enable CORS for frontend requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    next();
});

// 1. Simple post route
app.post('/post', (req, res) => {
    res.send(" hello from backend ");
});

// 2. Submit route - Prisma and Redis integration
app.post('/submit', async (req, res) => {
    const { email } = req.body || {};

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // A. Prisma Logic: Create user in Database (using a random suffix to avoid unique conflicts on repeat runs)
        const uniqueEmail = `${Date.now()}-${email}`;
        const user = await prisma.user.create({
            data: {
                email: uniqueEmail
            }
        });

        // B. Redis Logic: Push to submissions queue
        const queuePayload = JSON.stringify({
            userId: user.id,
            email: user.email,
            timestamp: new Date().toISOString()
        });

        await redisClient.rPush('submissions', queuePayload);

        res.status(200).json({
            success: true,
            message: "Submission successfully written to DB and pushed to Redis queue!",
            data: {
                user,
                redisQueuePayload: queuePayload
            }
        });
    } catch (err: any) {
        console.error("Error in /submit:", err);
        res.status(500).json({
            error: "Failed to process submission",
            details: err.message
        });
    }
});

// 3. Healthcheck endpoint checking DB and Redis connectivity
app.get('/health', async (req, res) => {
    let dbStatus = "UP";
    let redisStatus = "UP";
    const errors: any[] = [];

    try {
        await prisma.$queryRawUnsafe('SELECT 1');
    } catch (err: any) {
        dbStatus = "DOWN";
        errors.push({ database: err.message });
    }

    try {
        await redisClient.ping();
    } catch (err: any) {
        redisStatus = "DOWN";
        errors.push({ redis: err.message });
    }

    const statusCode = (dbStatus === "UP" && redisStatus === "UP") ? 200 : 500;
    res.status(statusCode).json({
        status: statusCode === 200 ? "OK" : "ERROR",
        services: {
            database: dbStatus,
            redis: redisStatus
        },
        errors
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});