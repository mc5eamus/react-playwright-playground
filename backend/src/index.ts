import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Example data
interface ExampleData {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

const exampleDataList: ExampleData[] = [
  {
    id: 1,
    title: 'First Item',
    description: 'This is the first example item from the API',
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Second Item',
    description: 'This is the second example item from the API',
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Third Item',
    description: 'This is the third example item from the API',
    timestamp: new Date().toISOString(),
  },
];

// Routes
app.get('/api/data', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: exampleDataList,
  });
});

app.get('/api/data/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = exampleDataList.find((item) => item.id === id);
  
  if (item) {
    res.json({
      success: true,
      data: item,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Item not found',
    });
  }
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
