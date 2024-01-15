import { useState } from "react";
import SearchBox from "./SearchBox";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import NoTaskFound from "./NoTaskFound";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask) => {
    if (taskToUpdate) {
      setTasks(
        tasks?.map((task) => {
          if (task?.id === newTask?.id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
    } else {
      setTasks([...tasks, newTask]);
    }
    setShowModal(false);
    setTaskToUpdate(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks?.filter((task) => task?.id !== taskId));
  };

  const handleDeleteAllTask = () => {
    setTasks([]);
  };

  return (
    <section className="mb-20 md:px-10 px-5" id="tasks">
      <TaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSaveTask={handleAddEditTask}
        taskToUpdate={taskToUpdate}
      />
      <div className="container">
        {/* <!-- Search Box --> */}
        <SearchBox />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => {
              setShowModal(true);
              setTaskToUpdate(null);
            }}
            handleDeleteAllTask={handleDeleteAllTask}
          />

          {tasks?.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEditClick={() => setShowModal(true)}
              setTaskToUpdate={setTaskToUpdate}
              handleDeleteTask={handleDeleteTask}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
