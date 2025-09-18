import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';

const TaskInput = () => {
  const [content, setContent] = useState('');
  const [stepsRequired, setStepsRequired] = useState(1);
  const session = useSession();

  const handleAddTask = async () => {
    if (!session?.user) {
      alert('You must be logged in to add tasks.');
      return;
    }

    const { error } = await supabase.from('tasks').insert([
      {
        user_id: session.user.id,
        content,
        is_complete: false,
        steps_complete: 0,
        steps_required: stepsRequired,
      },
    ]);

    if (error) {
      console.error('Error adding task:', error.message);
    } else {
      setContent('');
      setStepsRequired(1);
    }
  };

  return (
    <div className="max-w-md w-full">
      <h2>Add Tasks To Get Started!</h2>
      <form 
        className="flex flex-col py-4 gap-4"
        onSubmit={handleAddTask}
      >
        <h4>Name your task</h4>
        <input
          className="border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new task"
          required
        />
        <h4>Number of steps to complete task</h4>
        <input
          type="number"
          className="border p-2 rounded w-20"
          value={stepsRequired}
          onChange={(e) => setStepsRequired(Number(e.target.value))}
          min={1}
        />
        <button
          type="submit"
          className="font-semibold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskInput;