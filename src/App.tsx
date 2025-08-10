import React from 'react';
import { TaskProvider } from '@/contexts/TaskContext';
import { TaskStats } from '@/components/TaskStats';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskList } from '@/components/TaskList';
import { Toaster } from '@/components/ui/sonner';
import { CheckSquare, Github } from 'lucide-react';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <CheckSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Otro Todo App
                  </h1>
                  <p className="text-sm text-gray-600">
                    Aprende Git & GitHub
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Github className="h-4 w-4" />
                <span>Perfect for feature branches</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                App de Tareas Básico
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Una aplicación de gestión de tareas limpia y extensible diseñada para aprender flujos de trabajo de Git. 
              </p>
            </div>

            {/* Task Statistics */}
            <TaskStats />

            {/* Add Task Form */}
            <AddTaskForm />

            {/* Task List */}
            <TaskList />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 bg-white/90 backdrop-blur-sm border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">
                Built with React, TypeScript, Tailwind CSS, and shadcn/ui
              </p>
              <p className="text-xs">
                Perfect for teaching Git concepts: feature branches, pull requests, code reviews, and collaborative development
              </p>
            </div>
          </div>
        </footer>

        {/* Toast Notifications */}
        <Toaster />
      </div>
    </TaskProvider>
  );
}

export default App;
