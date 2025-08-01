import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { Trash2, Calendar, Clock } from 'lucide-react';
import { Task } from '@/types/task';
import { useTask } from '@/contexts/TaskContext';
import { useToast } from '@/hooks/use-toast';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toggleTask, deleteTask } = useTask();
  const { toast } = useToast();

  const handleToggle = () => {
    toggleTask(task.id);
    toast({
      title: task.completed ? "Task marked as pending" : "Task completed!",
      description: `"${task.title}" ${task.completed ? 'has been reopened' : 'is now complete'}`,
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      deleteTask(task.id);
      toast({
        title: "Task deleted",
        description: `"${task.title}" has been removed from your list`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className={`
      group bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg 
      transition-all duration-300 transform hover:-translate-y-1
      ${task.completed ? 'opacity-75' : ''}
    `}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggle}
            className="mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-medium text-gray-900 truncate
              ${task.completed ? 'line-through text-gray-500' : ''}
            `}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`
                text-sm mt-1 text-gray-600
                ${task.completed ? 'line-through text-gray-400' : ''}
              `}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Created {formatDate(task.createdAt)}</span>
              </div>
              
              {task.updatedAt.getTime() !== task.createdAt.getTime() && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated {formatDate(task.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-600 hover:bg-red-50"
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Task</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{task.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};