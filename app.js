const PORT = 3000;
const server = require('./middleware/server');
const { initializeDatabase } = require('./config/init');

async function startServer() {
    try {
        await initializeDatabase();
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();


