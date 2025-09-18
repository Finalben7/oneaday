import TaskCard from './TaskCard';

type Task = {
  id: number;
  content: string;
  is_complete: boolean;
  steps_complete: number;
  steps_required: number;
};

type TaskScrollerProps = {
  tasks: Task[];
};

const TaskScroller = ({ tasks }: TaskScrollerProps) => {
  if (!tasks.length) {
    return <p className="text-center">No tasks yet. Add one above!</p>;
  }

  // Duplicate the task list for looping animation
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
