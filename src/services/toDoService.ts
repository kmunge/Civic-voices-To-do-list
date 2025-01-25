import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, getFirestore } from 'firebase/firestore';
import { db } from '@/environments/environment';
import { Todo } from '@/models/toDo.model';

// this is a firestore collection reference
const todosCollectionRef = collection(db, 'todos');


// Subscribe to Firestore updates in real-time
export const subscribeTodos = (callback: (todos: Todo[]) => void) => {
  return onSnapshot(todosCollectionRef, (snapshot) => {
    const todos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Todo[];
    callback(todos.reverse());
  });
};

// Add a new todo
export const addTodo = async (title: string) => {
  if (!title.trim()) throw new Error("Title cannot be empty");

  const newTodo = {
    title: title.trim(),
    completed: false,
  };

  const docRef = await addDoc(todosCollectionRef, newTodo);
  return docRef.id;
};

// Toggle todo completed status
export const toggleTodo = async (id: string, completed: boolean) => {
  const todoRef = doc(db, 'todos', id);
  await updateDoc(todoRef, { completed });
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  const todoRef = doc(db, 'todos', id);
  await deleteDoc(todoRef);
};
