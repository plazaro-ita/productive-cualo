import React from 'react';
import { Button } from './ui/Button';

export function IntentionalBreak({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 dark:bg-zinc-950/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl shadow-xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Dynamic decorative ring */}
        <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[6px] border-stone-100 dark:border-zinc-800"></div>
          <div className="absolute inset-0 rounded-full border-[6px] border-stone-800 dark:border-zinc-400 border-l-transparent border-t-transparent animate-spin-slow" style={{ animationDuration: '8s' }}></div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold text-stone-900 dark:text-zinc-100 font-mono tracking-tight">05:00</span>
            <span className="text-xs text-stone-400 dark:text-zinc-500 mt-1 uppercase tracking-wider font-medium">Physical Reset</span>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-stone-900 dark:text-zinc-100 mb-3 tracking-tight">System Two Tax High</h3>
        <p className="text-stone-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
          Your cognitive load is high. Stepping away for a moment will improve focus, reduce fatigue, and maintain peak performance.
        </p>

        <div className="flex gap-4">
          <Button className="flex-1" size="lg" onClick={onClose}>
            Take Break (5m)
          </Button>
          <Button variant="outline" className="flex-1" size="lg" onClick={onClose}>
            Keep Pushing
          </Button>
        </div>
      </div>
    </div>
  );
}
