import React from 'react';

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90 shadow-sm",
    secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
    outline: "border border-stone-200 bg-transparent hover:bg-stone-100 dark:border-zinc-700 dark:hover:bg-zinc-800",
    ghost: "hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 py-2 text-sm",
    lg: "h-10 px-8 text-base",
    icon: "h-9 w-9"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
