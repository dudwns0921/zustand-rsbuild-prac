import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useTodoStore } from '@/store/todoStore';
import { Trash2, Edit2, Check, X } from 'lucide-react';

interface TodoItemProps {
  todo: TodoItem;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const toggleTodo = useTodoStore(state => state.actions.toggleTodo);
  const removeTodo = useTodoStore(state => state.actions.removeTodo);
  const updateTodo = useTodoStore(state => state.actions.updateTodo);

  const handleUpdate = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
        />

        {isEditing ? (
          <>
            <Input
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="flex-1"
              onKeyDown={e => {
                if (e.key === 'Enter') handleUpdate();
                if (e.key === 'Escape') handleCancel();
              }}
            />
            <Button size="icon" variant="ghost" onClick={handleUpdate}>
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <span
              className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
            >
              {todo.title}
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
