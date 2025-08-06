import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';

const TaskInput = () => {
  const user = useUser();
  const [content, setContent] = useState('');
  const [stepsRequired, setStepsRequired] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to add tasks.");

    const { error } = await supabase.from('tasks').insert([
      {
        user_id: user.id,
        content: content.trim(),
        steps_required: stepsRequired,
        steps_complete: 0,
        is_complete: false,
      },
    ]);

    if (error) {
      console.error('Error inserting task:', error.message);
      alert('Failed to add task.');
    } else {
      setContent('');
      setStepsRequired(1);
      alert('Task added!');
    }
  };

  return (
    <div>
      <h2>Add Your Tasks To Get Started!</h2>
      <form onSubmit={handleSubmit} className="flex flex-col py-4 gap-4 max-w-md w-full">
        <input
          type="text"
          placeholder="Task description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <input
          type="number"
          min="1"
          placeholder="Steps required"
          value={stepsRequired}
          onChange={(e) => setStepsRequired(parseInt(e.target.value))}
          className="p-2 border rounded"
          required
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