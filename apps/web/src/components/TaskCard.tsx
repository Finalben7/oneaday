type Task = {
  id: number;
  content: string;
  is_complete: boolean;
  steps_complete: number;
  steps_required: number;
};

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="p-4 m-4 border rounded-4xl shadow-sm w-full hover:bg-gray-700 transition-colors max-w-1/4">
      <h2 className="text-lg font-bold">{task.content}</h2>
      <p>
        Steps: {task.steps_complete}/{task.steps_required}
      </p>
      <p>Status: {task.is_complete ? '✅ Completed' : '⏳ In Progress'}</p>
    </div>
  );
};

export default TaskCard;
