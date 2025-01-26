const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require(process.env.FIREBASE_CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

// CORS configuration with proper headers
app.use(cors({
  origin: 'http://localhost:8080',  // Allow specific origin
  credentials: true,                 // Allow cookies, authorization headers
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', 'true');  // Important for credentials
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Middleware to parse incoming JSON requests
app.use(express.json());

const todosCollection = db.collection('todos');

// Get all todos
app.get('/api/todos', async (_req, res) => {
  try {
    const snapshot = await todosCollection.get();
    const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Add a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title.trim()) return res.status(400).json({ error: 'Title is required' });

    const newTodo = { title, completed: false };
    const docRef = await todosCollection.add(newTodo);
    res.status(201).json({ id: docRef.id, ...newTodo });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// Update todo completion status
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { completed } = req.body;
    const todoRef = todosCollection.doc(req.params.id);
    await todoRef.update({ completed });
    res.json({ id: req.params.id, completed });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    await todosCollection.doc(req.params.id).delete();
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});