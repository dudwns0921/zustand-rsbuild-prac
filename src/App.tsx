import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Organize your life, one task at a time. Stay productive and achieve
            your goals effortlessly.
          </p>
        </div>
        <TodoForm />
        <TodoFilter />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
