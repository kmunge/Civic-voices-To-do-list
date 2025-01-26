import { useEffect, useState } from "react";
import { TodoItem } from "@/components/TodoItem";
import { TodoInput } from "@/components/TodoInput";
import { useToast } from "@/components/ui/use-toast";
import { subscribeTodos,addTodo,toggleTodo,deleteTodo} from "@/services/toDoService";
import { Todo } from "@/models/toDo.model";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Subscribes to Firestore real-time updates when the component mounts.
    // The `subscribeTodos` function listens for changes in the 'todos' collection 
    // and updates the local state with the latest data whenever changes occur.
    // The callback function `setTodos` updates the state with the received todos.
    const unsubscribe = subscribeTodos(setTodos);

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe(); // Ensure cleanup actually unsubscribes
      }
    };
  }, []);

  // Add a new todo with optimistic UI update
  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await addTodo(title);

      setTodos((prevTodos) => [newTodo, ...prevTodos]); // Optimistic update
      toast({
        title: "Todo added",
        description: "Your new todo has been added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to add todo",
        variant: "destructive",
      });
    }
  };

  // Toggle a todo's completed status
  const handleToggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      try {
        const updatedTodos = todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        );
        setTodos(updatedTodos); // Optimistic update
        await toggleTodo(id, !todo.completed);
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to update todo",
          variant: "destructive",
        });
      }
    }
  };

  // Delete a todo with optimistic UI update
  const handleDeleteTodo = async (id: string) => {
    try {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Optimistic update
      await deleteTodo(id);
      toast({
        title: "Todo deleted",
        description: "The todo has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete todo",
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
