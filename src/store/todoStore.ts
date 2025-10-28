import { create } from 'zustand';

interface TodoStore {
  todos: TodoItem[];
  searchTerm: string;
  filterStatus: 'all' | 'active' | 'completed';
  actions: {
    setSearchTerm: (term: string) => void;
    setFilterStatus: (status: 'all' | 'active' | 'completed') => void;
    addTodo: (todo: TodoItem) => void;
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    updateTodo: (id: number, title: string) => void;
  };
}

export const useTodoStore = create<TodoStore>(set => ({
  todos: [],
  searchTerm: '',
  filterStatus: 'all',

  actions: {
    setSearchTerm: term => set({ searchTerm: term }),
    setFilterStatus: status => set({ filterStatus: status }),
    addTodo: todo => set(state => ({ todos: [...state.todos, todo] })),
    removeTodo: id =>
      set(state => ({
        todos: state.todos.filter(todo => todo.id !== id),
      })),
    toggleTodo: id =>
      set(state => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      })),
    updateTodo: (id, title) => {
      const updatedAt = new Date();
      set(state => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, title, updatedAt } : todo
        ),
      }));
    },
  },
}));

export const selectFilteredTodos = (state: TodoStore) => {
  const { todos, searchTerm, filterStatus } = state;
  return todos.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && !todo.completed) ||
      (filterStatus === 'completed' && todo.completed);
    return matchesSearch && matchesStatus;
  });
};
