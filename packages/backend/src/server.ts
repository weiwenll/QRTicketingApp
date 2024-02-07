import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Test backend is running with Postman
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World from backend!');
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});