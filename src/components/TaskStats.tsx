import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { useTask } from '@/contexts/TaskContext';

export const TaskStats: React.FC = () => {
  const { stats } = useTask();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Tasks
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <p className="text-xs text-gray-500 mt-1">
            {stats.total === 1 ? 'task' : 'tasks'} in your list
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Completed
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
          <p className="text-xs text-gray-500 mt-1">
            {stats.completionRate}% completion rate
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Pending
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
          <p className="text-xs text-gray-500 mt-1">
            {stats.pending === 1 ? 'task' : 'tasks'} remaining
          </p>
        </CardContent>
      </Card>

      {stats.total > 0 && (
        <Card className="col-span-full bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={stats.completionRate} 
              className="w-full h-3"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{stats.completed} completed</span>
              <span>{stats.pending} remaining</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};