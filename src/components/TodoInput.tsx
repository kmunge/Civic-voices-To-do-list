import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [title, setTitle] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Todo title cannot be empty",
        variant: "destructive",
      });
      return;
    }
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      <Button type="submit">
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  );
};