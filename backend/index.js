const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK with credentials from the environment variable
const serviceAccount = require(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

// Enable CORS with proper configuration
app.use(cors({
  origin: ['http://localhost:8080'],  // Allow requests from these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],  // Allowed HTTP methods
  credentials: true,  // Allow cookies/auth credentials
  allowedHeaders: ['Content-Type', 'Authorization']  // Allow necessary headers
}));

// Handle preflight for all routes
app.options('*', cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

const todosCollection = db.collection('todos');

// Get all todos
app.get('/api/todos', async (req, res) => {
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
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = { title: title.trim(), completed: false };
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

// Catch-all route to handle invalid requests
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});