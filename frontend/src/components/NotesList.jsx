import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/Button';

export function NotesList({ notes, onDeleteNote }) {
  if (notes.length === 0) return null;

  return (
    <div className="mt-8 border-t border-stone-200 dark:border-zinc-800 pt-8">
      <h3 className="text-sm font-medium text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-4 border-b border-stone-100 dark:border-zinc-800 pb-2">Brain Dump Notes</h3>
      <div className="space-y-3">
        {notes.map(note => (
          <div key={note.id} className="flex justify-between items-start gap-4 p-3 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl relative group">
            <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed pr-8">{note.title}</p>
            <button 
              onClick={() => onDeleteNote(note.id)}
              className="absolute right-3 top-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
              title="Delete note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
