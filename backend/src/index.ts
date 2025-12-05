import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { resourceRouter } from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.send('MVP Backend API Running');
});

// Routes
app.use('/api/resources', resourceRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
