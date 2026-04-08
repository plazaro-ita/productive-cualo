import React, { useEffect, useState } from 'react';
import { ActiveTask } from './components/ActiveTask';
import { TaskQueue } from './components/TaskQueue';
import { BrainDump } from './components/BrainDump';
import { IntentionalBreak } from './components/IntentionalBreak';
import { NotesList } from './components/NotesList';
import { NewTaskModal } from './components/NewTaskModal';
import { fetchTasks, createTask, updateTask, deleteTask } from './lib/api';
import { Button } from './components/ui/Button';
import { Plus } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCaptureNote = async (title) => {
    // Quick capture tasks act as new items pushed with type 'note'
    const newNote = {
      title,
      type: 'note', 
      status: 'pending'
    };
    try {
      const created = await createTask(newNote);
      setTasks(prev => [...prev, created]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const created = await createTask(taskData);
      setTasks(prev => [...prev, created]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCompleteTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      await updateTask(id, { status: 'completed' });
      setTasks(prev => prev.filter(t => t.id !== id));
      
      // If it was a deep work task, prompt an intentional break
      if (task.type === 'deep_work') {
        setShowBreakModal(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePauseTask = async (id) => {
    try {
      await updateTask(id, { status: 'pending' });
      loadTasks();
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartTask = async (id) => {
    try {
      const active = tasks.find(t => t.status === 'active');
      if (active) {
        await updateTask(active.id, { status: 'pending' });
      }
      
      await updateTask(id, { status: 'active' });
      loadTasks();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeferTask = async (id) => {
    const taskList = [...tasks];
    const index = taskList.findIndex(t => t.id === id);
    if (index === -1) return;
    
    const [deferredTask] = taskList.splice(index, 1);
    taskList.push(deferredTask);
    setTasks(taskList);
  };

  // derived state
  const activeTask = tasks.find(t => t.status === 'active' && t.type !== 'note');
  const queueTasks = tasks.filter(t => t.status !== 'completed' && t.status !== 'active' && t.type !== 'note');
  const notes = tasks.filter(t => t.type === 'note' && t.status !== 'completed');

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950 text-stone-900 dark:text-zinc-200 font-sans pb-32 selection:bg-stone-200 dark:selection:bg-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
        
        <header className="mb-16 flex justify-between items-center">
          <h1 className="text-lg font-semibold tracking-tight">LIFO<span className="text-stone-400 font-normal ml-1">Workspace</span></h1>
          <Button onClick={() => setShowNewTaskModal(true)} variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Plan Task
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Focus Area - Left Column */}
          <div className="lg:col-span-8">
            <ActiveTask 
              task={activeTask} 
              onComplete={handleCompleteTask} 
              onPause={handlePauseTask} 
            />
            
            {/* Notes List displays separately below the main area or alongside it */}
            <NotesList notes={notes} onDeleteNote={handleDeleteNote} />
          </div>

          {/* Context Queue Area - Right Column */}
          <div className="lg:col-span-4">
            <TaskQueue 
              tasks={queueTasks} 
              onStartTask={handleStartTask} 
              onDeferTask={handleDeferTask} 
            />
            {queueTasks.length > 0 && (
              <div className="mt-4 pt-4 border-t border-stone-100 dark:border-zinc-800 border-dashed">
                <Button onClick={() => setShowNewTaskModal(true)} variant="ghost" className="w-full text-stone-500 hover:text-stone-900 dark:hover:text-zinc-200">
                  + Add to queue
                </Button>
              </div>
            )}
          </div>
        </div>

      </div>

      <BrainDump onCapture={handleCaptureNote} />
      
      <IntentionalBreak 
        isOpen={showBreakModal} 
        onClose={() => setShowBreakModal(false)}
      />
      
      <NewTaskModal 
        isOpen={showNewTaskModal} 
        onClose={() => setShowNewTaskModal(false)} 
        onCreate={handleCreateTask} 
      />
    </div>
  );
}

export default App;
