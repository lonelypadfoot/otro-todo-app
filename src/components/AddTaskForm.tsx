import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useTask } from '@/contexts/TaskContext';
import { useToast } from '@/hooks/use-toast';

export const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addTask } = useTask();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Error",
        description: "El título de la tarea es obligatorio",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      addTask(title, description || undefined);
      setTitle('');
      setDescription('');

      toast({
        title: "Éxito",
        description: "¡Tarea añadida con éxito!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo añadir la tarea. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Plus className="h-5 w-5 text-blue-500" />
          Añadir Nueva Tarea
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Título de la Tarea *
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Introduce el título de la tarea..."
              className="mt-1 bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Descripción (Opcional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Introduce la descripción de la tarea..."
              className="mt-1 bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Añadiendo Tarea...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Añadir Tarea
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};