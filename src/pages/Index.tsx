import { useEffect, useState } from "react";
import { TodoItem } from "@/components/TodoItem";
import { TodoInput } from "@/components/TodoInput";
import { useToast } from "@/components/ui/use-toast";
import { subscribeTodos, addTodo, toggleTodo, deleteTodo } from "@/services/toDoService";
import { Todo } from "@/models/toDo.model";

const Index = () => {
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Subscribes to Firestore real-time updates when the component mounts.
    // The `subscribeTodos` function listens for changes in the 'todos' collection 
    // and updates the local state with the latest data whenever changes occur.
    // The callback function `setTodos` updates the state with the received todos.
    const unsubscribe = subscribeTodos((updatedTodos) => {
      setTodos(updatedTodos);
    });
    // Cleanup function: Unsubscribes from Firestore updates when the component unmounts,
    // preventing memory leaks and unnecessary re-renders.
    return () => unsubscribe();
  }, []);

  //to add a new todo
  const handleAddTodo = async (title: string) => {
    try {
      await addTodo(title);
      toast({
        title: "Todo added",
        description: "Your new todo has been added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add todo",
        variant: "destructive",
      });
    }
  };

  //to toggle a todo
  const handleToggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      try {
        await toggleTodo(id, !todo.completed);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update todo",
          variant: "destructive",
        });
      }
    }
  };

  //to delete a todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      toast({
        title: "Todo deleted",
        description: "The todo has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete todo",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Todo List</h1>
        <div className="space-y-6">
          <TodoInput onAdd={handleAddTodo} />
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
            {todos.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No todos yet. Add one above!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;