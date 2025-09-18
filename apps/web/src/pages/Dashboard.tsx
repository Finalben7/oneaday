import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useSession, useUser } from '@supabase/auth-helpers-react';
import TaskScroller from '../components/TaskScroller'
import TaskInput from '../components/TaskInput'
import Header from "../components/Header";

type Task = {
  id: number;
  content: string;
  is_complete: boolean;
  steps_complete: number;
  steps_required: number;
  user_id: string;
};

const Dashboard = () => {
    const user = useUser()
  const session = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);

  // fetch tasks initially
  const fetchTasks = async () => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', session.user.id)
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error.message);
    } else {
      setTasks(data || []);
    }
  };

  useEffect(() => {
    if (!session?.user) return;

    // 1️⃣ fetch once on load
    fetchTasks();

    // 2️⃣ subscribe to realtime changes
    const channel = supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // listen for INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${session.user.id}`, // only listen to this user's tasks
        },
        (payload) => {
          console.log('Realtime update:', payload);

          if (payload.eventType === 'INSERT') {
            setTasks((prev) => [...prev, payload.new as Task]);
          }

          if (payload.eventType === 'UPDATE') {
            setTasks((prev) =>
              prev.map((task) =>
                task.id === (payload.new as Task).id ? (payload.new as Task) : task
              )
            );
          }

          if (payload.eventType === 'DELETE') {
            setTasks((prev) =>
              prev.filter((task) => task.id !== (payload.old as Task).id)
            );
          }
        }
      )
      .subscribe();

    // 3️⃣ clean up on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

    return (
        <div>
            <Header />
            <section className="grid justify-items-center gap-20 pt-4 text-center">
                <div>
                    <h1 className="text-4xl font-bold">Hey {user?.user_metadata.display_name}, welcome to One A Day</h1>
                    <h2 className="text-lg">Your daily accountability companion.</h2>
                </div>
                <TaskScroller tasks={tasks} />
                <TaskInput />
            </section>
        </div>
    );
    };

export default Dashboard;