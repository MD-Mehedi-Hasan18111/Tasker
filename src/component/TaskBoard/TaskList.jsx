/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

export default function TaskList({ tasks, onEditClick, setTaskToUpdate }) {
  return (
    <div className="overflow-auto">
      <table className="table-fixed overflow-auto xl:w-full">
        <thead>
          <tr>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px] text-left">
              {" "}
              Title{" "}
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-full text-left">
              {" "}
              Description{" "}
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px] text-left">
              {" "}
              Tags{" "}
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px] text-left">
              {" "}
              Priority{" "}
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              {" "}
              Options{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => {
            return (
              <tr
                key={task?.id}
                className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
              >
                <td>
                  {task?.isFavorite ? (
                    <FaStar color="yellow" />
                  ) : (
                    <FaStar color="gray" />
                  )}
                </td>
                <td>{task?.title}</td>
                <td>
                  <div>{task?.description}</div>
                </td>
                <td>
                  <ul className="flex justify-start gap-1.5 flex-wrap">
                    {task?.tags?.map((tag) => {
                      return (
                        <li key={tag?.tagId}>
                          <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#1C92FFB0] px-2.5 text-sm capitalize text-[#F4F5F6]">
                            {tag?.tagName}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td className="text-left">{task?.priority}</td>
                <td>
                  <div className="flex items-center justify-center space-x-3">
                    <button className="text-red-500">Delete</button>
                    <button
                      onClick={() => {
                        onEditClick();
                        setTaskToUpdate(task);
                      }}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
