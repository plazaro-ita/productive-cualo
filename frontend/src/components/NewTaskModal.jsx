import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from './ui/Button';

export function NewTaskModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('deep_work');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onCreate({
      title,
      type,
      status: 'pending',
      subtasks: subtasks.map(t => ({ id: Math.random().toString(), title: t, completed: false }))
    });
    
    setTitle('');
    setType('deep_work');
    setSubtasks([]);
    onClose();
  };

  const addSubtask = (e) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, newSubtask.trim()]);
      setNewSubtask('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 dark:bg-zinc-950/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl shadow-xl w-full max-w-lg p-8 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-zinc-100">Plan New Task</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-900 dark:hover:text-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form flex="1" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-2">Goal / Task Title</label>
            <input 
              autoFocus
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-stone-200 dark:border-zinc-800 rounded-xl px-4 py-3 bg-transparent text-stone-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-stone-200 dark:focus:ring-zinc-700"
              placeholder="What do you need to accomplish?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-2">Cognitive Load</label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="type" 
                  value="deep_work" 
                  checked={type === 'deep_work'} 
                  onChange={(e) => setType(e.target.value)}
                  className="sr-only peer" 
                />
                <div className="p-4 border border-stone-200 dark:border-zinc-800 rounded-xl text-center peer-checked:bg-stone-900 peer-checked:text-white dark:peer-checked:bg-zinc-100 dark:peer-checked:text-zinc-900 transition-colors">
                  <div className="font-semibold text-sm mb-1">Deep Work</div>
                  <div className="text-xs opacity-70">Focus required</div>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="type" 
                  value="shallow_work" 
                  checked={type === 'shallow_work'} 
                  onChange={(e) => setType(e.target.value)}
                  className="sr-only peer" 
                />
                <div className="p-4 border border-stone-200 dark:border-zinc-800 rounded-xl text-center peer-checked:bg-stone-900 peer-checked:text-white dark:peer-checked:bg-zinc-100 dark:peer-checked:text-zinc-900 transition-colors">
                  <div className="font-semibold text-sm mb-1">Shallow Work</div>
                  <div className="text-xs opacity-70">Admin & low effort</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-2">Subtasks (Optional)</label>
            <div className="flex gap-2 mb-3">
              <input 
                type="text" 
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask(e))}
                className="flex-1 border border-stone-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm bg-transparent outline-none focus:ring-2 focus:ring-stone-200 dark:focus:ring-zinc-700"
                placeholder="Stupid simple next step..."
              />
              <Button type="button" variant="secondary" onClick={addSubtask}>Add</Button>
            </div>
            
            {subtasks.length > 0 && (
              <ul className="space-y-2 mt-4 text-sm text-stone-600 dark:text-zinc-400">
                {subtasks.map((st, i) => (
                   <li key={i} className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-zinc-600"></span>
                     {st}
                   </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-zinc-800">
            <Button type="submit" className="w-full" size="lg">Create Task</Button>
          </div>
        </form>

      </div>
    </div>
  );
}
