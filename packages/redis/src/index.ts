import redis from 'redis';

// Intercept uncaught/unhandled connection errors in Bun's net library
process.on('uncaughtException', (err) => {
    if (err.message.includes('ECONNREFUSED')) {
        console.warn('[Redis] Connection refused. Retrying in background...');
    } else {
        console.error('Uncaught Exception:', err);
    }
});

process.on('unhandledRejection', (reason) => {
    console.warn('[Redis] Unhandled Promise Rejection (connection status):', reason);
});

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => {
    console.error("Redis Client Error:", err.message);
});

client.connect().then(() => {
    console.log("Redis ===== connected")
}).catch((err) => {
    console.error("Redis ===== connection error", err.message);
});

export default client;