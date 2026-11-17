const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('./db/connectDB');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const Products = require('./modal/productSchema');
const sampleProducts = require('./seedData');

dotenv.config();

const port = process.env.PORT || process.env.port || 5000;
const mongoURI = process.env.MONGO_URI || process.env.mongoURI || process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Health Check and Root Endpoints
app.get('/', (req, res) => {
    res.json({ message: 'ShoeStop API is running', status: 'healthy', timestamp: new Date() });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date() });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date() });
});

// Application Routes
app.use('/', userRoutes);
app.use('/api', productRoutes);

// Automatic DB Seeding Function
const seedDatabaseIfEmpty = async () => {
    try {
        const count = await Products.countDocuments();
        if (count === 0) {
            console.log('Seeding initial ShoeStop product catalog...');
            await Products.insertMany(sampleProducts);
            console.log(`Seeded ${sampleProducts.length} shoe products successfully!`);
        } else {
            console.log(`Database already populated with ${count} products.`);
        }
    } catch (err) {
        console.error('Error during initial product seeding:', err.message);
    }
};

let memoryServerInstance = null;

const startServer = async () => {
    try {
        let uri = mongoURI;

        if (!uri) {
            console.log('No external MongoDB URI specified. Launching local in-memory MongoDB...');
            const { MongoMemoryServer } = require('mongodb-memory-server');
            memoryServerInstance = await MongoMemoryServer.create();
            uri = memoryServerInstance.getUri() + 'shoestop';
            console.log(`Local in-memory MongoDB active at: ${uri}`);
        } else {
            const maskedUri = uri.replace(/:[^:@]+@/, ':****@');
            console.log(`Connecting to configured MongoDB (${maskedUri})...`);
        }

        try {
            await connectDB(uri);
            console.log('Connected to MongoDB successfully!');
        } catch (dbErr) {
            console.warn(`Connection to configured MongoDB failed (${dbErr.message}).`);
            console.log('Falling back to local in-memory MongoDB instance for continuous availability...');
            const { MongoMemoryServer } = require('mongodb-memory-server');
            memoryServerInstance = await MongoMemoryServer.create();
            uri = memoryServerInstance.getUri() + 'shoestop';
            await connectDB(uri);
            console.log(`Connected to fallback in-memory MongoDB at: ${uri}`);
        }

        // Seed initial products if collection is empty
        await seedDatabaseIfEmpty();

        const server = app.listen(port, '0.0.0.0', () => {
            console.log(`ShoeStop backend server running on port ${port}`);
        });

        // Graceful container shutdown
        const gracefulShutdown = async () => {
            console.log('Received termination signal. Closing server...');
            server.close(async () => {
                if (memoryServerInstance) {
                    await memoryServerInstance.stop();
                }
                console.log('Server and database closed gracefully.');
                process.exit(0);
            });
        };

        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();