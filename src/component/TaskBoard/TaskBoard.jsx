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

  function handleFavorite(taskId) {
    // This portion of the commented code is not fully perfect. Here
    // we are not doing the deep cloning of the tasks array. The tasks array has
    // objects inside, while using the spread operator, it will only make the shallow copy.
    // But we need to do the deep copy.

    // We are not removing this commented code as it was part of the recording.
    // But the same code is now made better and written below.
    /*
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        const newTasks = [...tasks];
        newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
        setTasks(newTasks);
        */

    // The better way of managing updates in the object within an array as a
    // state in react.
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavorite: !task.isFavorite };
        } else {
          return task;
        }
      })
    );
  }

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
              onFav={handleFavorite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
