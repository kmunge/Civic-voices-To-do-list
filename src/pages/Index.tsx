import { useState, useEffect } from "react";
import { TodoItem } from "@/components/TodoItem";
import { TodoInput } from "@/components/TodoInput";
import { useToast } from "@/components/ui/use-toast";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    toast({
      title: "Todo added",
      description: "Your new todo has been added successfully",
    });
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast({
      title: "Todo deleted",
      description: "The todo has been deleted successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Todo List</h1>
        <div className="space-y-6">
          <TodoInput onAdd={addTodo} />
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
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