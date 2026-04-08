import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function BrainDump({ onCapture }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onCapture(text);
    setText('');
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-stone-200 dark:focus-within:ring-zinc-700 transition-all"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Brain dump... quick capture note or task (Enter to save)"
          className="w-full bg-transparent border-none py-4 pl-6 pr-14 outline-none text-stone-700 dark:text-zinc-200 placeholder:text-stone-400 dark:placeholder:text-zinc-500 rounded-2xl text-[15px]"
        />
        <button
          type="submit"
          className="absolute right-3 p-2 bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-400 rounded-xl transition-colors disabled:opacity-50"
          disabled={!text.trim()}
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
