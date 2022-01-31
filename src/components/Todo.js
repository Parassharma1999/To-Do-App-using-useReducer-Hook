import React from "react";
import {
  MdDelete,
  MdDoneOutline,
  MdOutlinePendingActions,
} from "react-icons/md";

const Todo = ({ todo, dispatch }) => {
  const { id, task, note, date, complete } = todo;

  const completeNotice = "Mark as Complete ";
  const PendingNotice = "Mark as Pending ";

  return (
    <div className=" w-auto">
      <section
        className={
          complete
            ? "flex flex-col m-3 p-5 pb-2 bg-green-200 border-green-500 border-2 rounded-xl"
            : "flex flex-col m-3 p-5 pb-2 bg-red-200 border-red-500 border-2 rounded-xl"
        }
      >
        <div className="text-center">
          <div className="text-xl font-bold text-center mb-2">{task}</div>
        </div>
        <div className="text-sm font-bold text-center">{date}</div>
        <div className="text-sm text-center mb-2">{note}</div>
        <section className="flex justify-center gap-2">
          <MdDelete
            className="inline h-5 w-5 cursor-pointer hover:h-6 hover:w-6 hover:text-red-500 "
            onClick={() => {
              dispatch({ type: "DELETE", payload: { id: id } });
            }}
          />
        </section>

        <button
          className={
            complete
              ? "bg-green-400 self-center text-yellow-900 w-56 h-10 rounded-xl"
              : "bg-yellow-400 self-center text-yellow-900 w-56 h-10 rounded-xl"
          }
          onClick={() => {
            dispatch({ type: "COMPLETED", payload: { id: id } });
          }}
        >
          {complete ? (
            <div>
              <p className="inline text-slate-800">{PendingNotice}</p>
              <MdOutlinePendingActions className="inline text-slate-800" />
            </div>
          ) : (
            <div>
              <p className="inline">{completeNotice}</p>
              <MdDoneOutline className="inline" />
            </div>
          )}
        </button>
      </section>
    </div>
  );
};

export default Todo;
