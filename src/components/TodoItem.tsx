import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ id, title, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-border group hover:border-primary/20 transition-colors">
      <Checkbox
        checked={completed}
        onCheckedChange={() => onToggle(id)}
        className={cn(
          "transition-colors",
          completed && "bg-success border-success hover:bg-success/90 hover:border-success/90"
        )}
      />
      <span
        className={cn(
          "flex-1 text-sm transition-colors",
          completed && "text-muted-foreground line-through"
        )}
      >
        {title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
};