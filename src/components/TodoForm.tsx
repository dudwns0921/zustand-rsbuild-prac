import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useTodoStore } from '@/store/todoStore';

export function TodoForm() {
  const [title, setTitle] = useState('');
  const addTodo = useTodoStore(state => state.actions.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo: TodoItem = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addTodo(newTodo);
    setTitle('');
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1"
          />
          <Button type="submit">Add</Button>
        </form>
      </CardContent>
    </Card>
  );
}
