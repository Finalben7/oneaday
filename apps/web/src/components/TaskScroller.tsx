import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import TaskCard from './TaskCard';

type Task = {
  id: number;
  content: string;
  is_complete: boolean;
  steps_complete: number;
  steps_required: number;
};

const TaskScroller = () => {
  const session = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!session) return;

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error fetching tasks:', error.message);
      } else {
        setTasks(data || []);
      }

      setLoading(false);
    };

    fetchTasks();
  }, [session]);

  if (loading) return <p className="text-center">Loading tasks...</p>;

  if (!tasks.length) return <p className="text-center">No tasks yet. Add one above!</p>;

  // Duplicate the task list for looping
  const animatedTasks = [...tasks, ...tasks];

  return (
    <div className="relative h-[400px] overflow-hidden w-full">
      <div
        className="grid justify-items-center absolute w-full animate-vertical-scroll"
        style={{
          animation: 'scroll-vertical 20s linear infinite',
        }}
      >
        {animatedTasks.map((task, index) => (
          <TaskCard key={`${task.id}-${index}`} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskScroller;