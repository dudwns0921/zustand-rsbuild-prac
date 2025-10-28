import { useShallow } from 'zustand/react/shallow';
import { useTodoStore, selectFilteredTodos } from '@/store/todoStore';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const todos = useTodoStore(state => state.todos);
  const filteredTodos = useTodoStore(useShallow(selectFilteredTodos));

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No todos yet. Add one above!
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No todos match your filter criteria.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
