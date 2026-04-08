import React, { useState, useEffect } from 'react';
import { Play, Check, Pause, Coffee } from 'lucide-react';
import { Button } from './ui/Button';

export function ActiveTask({ task, onComplete, onPause }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (task && task.status === 'active') {
      interval = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [task]);

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center p-12 py-24 bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl shadow-sm text-center">
        <Coffee className="w-12 h-12 text-stone-300 dark:text-zinc-600 mb-4" />
        <h2 className="text-xl font-medium text-stone-700 dark:text-zinc-300">Nothing active right now</h2>
        <p className="text-stone-400 dark:text-zinc-500 mt-2 max-w-sm">Select a task from your queue or capture a new thought below.</p>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 lg:p-12 shadow-sm relative overflow-hidden">
      {/* Subtle top border for active state */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-stone-900 dark:bg-zinc-600"></div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">{task.type === 'deep_work' ? 'Deep Work' : 'Shallow Work'}</span>
        </div>
        <div className="text-stone-400 font-mono text-xl">
          {formatTime(elapsed)}
        </div>
      </div>

      <h1 className="text-3xl lg:text-4xl font-semibold text-stone-900 dark:text-zinc-100 tracking-tight leading-tight mb-8">
        {task.title}
      </h1>

      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mb-10 space-y-3">
          <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">Stupid Simple Next Steps</h3>
          {task.subtasks.map((st) => (
            <label key={st.id} className="flex items-center gap-3 group cursor-pointer">
              <input type="checkbox" defaultChecked={st.completed} className="w-5 h-5 rounded border-stone-300 text-stone-900 focus:ring-stone-900" />
              <span className={`text-base ${st.completed ? 'line-through text-stone-400' : 'text-stone-700 dark:text-zinc-300 group-hover:text-stone-900 dark:group-hover:text-zinc-100'}`}>
                {st.title}
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-stone-100 dark:border-zinc-800">
        <Button size="lg" onClick={() => onComplete(task.id)} className="gap-2">
          <Check className="w-5 h-5" />
          Complete Task
        </Button>
        <Button variant="outline" size="lg" onClick={() => onPause(task.id)} className="gap-2">
          <Pause className="w-5 h-5" />
          Pause
        </Button>
      </div>
    </div>
  );
}
