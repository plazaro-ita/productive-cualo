import React from 'react';
import { ArrowDown, Play } from 'lucide-react';
import { Button } from './ui/Button';

export function TaskQueue({ tasks, onStartTask, onDeferTask }) {
  if (tasks.length === 0) {
    return (
      <div className="text-stone-500 dark:text-zinc-500 text-sm py-4">
        Queue is empty.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Upcoming List</h3>
      
      {tasks.map((task, index) => (
        <div 
          key={task.id} 
          className={`flex items-center justify-between p-4 rounded-xl border border-stone-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-stone-200 dark:hover:border-zinc-700 transition-all duration-300 ${index === 0 ? 'opacity-100' : 'opacity-60 blur-[1px] hover:blur-none hover:opacity-100'}`}
        >
          <div className="flex flex-col">
            <span className="font-medium text-stone-800 dark:text-zinc-200 text-sm block mb-1">{task.title}</span>
            <span className="text-xs text-stone-400 dark:text-zinc-500 uppercase tracking-wider">{task.type === 'deep_work' ? 'Deep Work' : 'Shallow Work'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onDeferTask(task.id)} title="Defer for later">
              <ArrowDown className="w-4 h-4 text-stone-400" />
            </Button>
            <Button variant="secondary" size="sm" onClick={() => onStartTask(task.id)} className="gap-1.5">
              <Play className="w-3.5 h-3.5" />
              Start
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
