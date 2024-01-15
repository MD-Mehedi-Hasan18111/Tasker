/* eslint-disable react/prop-types */
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { IoMdClose } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";

export default function TaskModal({
  showModal,
  setShowModal,
  onSaveTask,
  taskToUpdate,
}) {
  const customCloseIcon = <IoMdClose color="white" size={30} />;

  const [task, setTask] = useState({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    tags: [],
    priority: "",
    isFavorite: false,
  });

  const [isAdd, setIsAdd] = useState(true);

  useEffect(() => {
    if (taskToUpdate) {
      setTask(taskToUpdate);
      setIsAdd(false);
    } else {
      setTask({
        id: crypto.randomUUID(),
        title: "",
        description: "",
        tags: [],
        priority: "",
        isFavorite: false,
      });
      setIsAdd(true);
    }
  }, [taskToUpdate]);

  const handleEditTask = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  // Add New tags
  const [isAddTag, setIsAddTag] = useState(true);
  const [newTagName, setNewTagName] = useState("");

  const handleAddTag = () => {
    const copyOfTags = task?.tags;
    const newAraTags = [
      ...copyOfTags,
      { tagId: crypto.randomUUID(), tagName: newTagName },
    ];
    setTask({
      ...task,
      tags: newAraTags,
    });
    setIsAddTag(false);
    setNewTagName("");
  };

  const handleRemoveTag = (tagId) => {
    const AfterRemoveTag = task?.tags?.filter((tag) => tag?.tagId !== tagId);
    setTask({
      ...task,
      tags: AfterRemoveTag,
    });
  };

  return (
    <>
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setTask({
            id: crypto.randomUUID(),
            title: "",
            description: "",
            tags: [],
            priority: "",
            isFavorite: false,
          });
        }}
        classNames={{ modal: "customModalStyle" }}
        closeIcon={customCloseIcon}
        center
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSaveTask(task);
            setTask({
              id: crypto.randomUUID(),
              title: "",
              description: "",
              tags: [],
              priority: "",
              isFavorite: false,
            });
          }}
          className="mx-auto my-10 max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] px-9 max-md:px-4 lg:py-11"
        >
          <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
            {isAdd ? "Add New" : "Edit"} Task
          </h2>

          <div className="space-y-9 text-white lg:space-y-10">
            {/* <!-- title --> */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="title">Title</label>
              <input
                value={task?.title}
                onChange={handleEditTask}
                className="block md:w-[500px] w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="title"
                id="title"
                required
              />
            </div>
            {/* <!-- description --> */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                value={task?.description}
                onChange={handleEditTask}
                className="block min-h-[120px] md:w-[500px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                type="text"
                name="description"
                id="description"
                required
              ></textarea>
            </div>
            {/* <!-- input group --> */}
            <div className="flex flex-col space-y-6 md:w-[500px] w-full">
              {/* <!-- tags --> */}
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="tags">Tags</label>
                <div className="rounded-md bg-[#2D323F] px-1 pb-2.5">
                  <div className="flex items-center space-y-3 flex-wrap">
                    {task?.tags?.map((tag, i) => {
                      return (
                        <div
                          key={i}
                          className={`${
                            i == 0 && "mt-2.5"
                          } rounded-[45px] bg-[#1C92FFB0] px-2 py-[3px] flex items-center space-x-3 w-auto ml-3`}
                        >
                          <span className="text-sm capitalize text-[#F4F5F6]">
                            {tag?.tagName}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag?.tagId)}
                            className="text-white text-[12px]"
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                    {!isAddTag && task?.tags?.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsAddTag(true)}
                        className="text-white text-[12px]"
                      >
                        <CiCirclePlus className="text-[24px] ml-4" />
                      </button>
                    )}
                    {(isAddTag || task?.tags?.length == 0) && (
                      <div className="flex items-center space-x-2.5 ml-3">
                        <input
                          autoFocus
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          className={`${
                            task?.tags?.length > 0 ? "w-[150px]" : "w-full"
                          } bg-[#2D323F] px-1 border-b border-white focus:outline-none`}
                          type="text"
                        />
                        <div className="flex items-center space-x-3">
                          {newTagName?.length > 0 && (
                            <button type="button" onClick={handleAddTag}>
                              ✔
                            </button>
                          )}
                          {task?.tags?.length > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddTag(false);
                                setNewTagName("");
                              }}
                            >
                              ❌
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <!-- priority --> */}
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="priority">Priority</label>
                <select
                  value={task?.priority}
                  onChange={handleEditTask}
                  className="block md:w-[500px] w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                  name="priority"
                  id="priority"
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>
          {/* <!-- inputs ends --> */}
          <div className="mt-16 flex justify-between lg:mt-20">
            <button
              onClick={() => {
                setShowModal(false);
                setTask({
                  id: crypto.randomUUID(),
                  title: "",
                  description: "",
                  tags: [],
                  priority: "",
                  isFavorite: false,
                });
              }}
              type="button"
              className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
