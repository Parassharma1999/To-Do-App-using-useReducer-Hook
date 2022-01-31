import React, { useState, useReducer, createContext } from "react";
import Todo from "./components/Todo";

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      if (action.payload.date && action.payload.task !== "") {
        return [
          ...state,
          newTodo(
            action.payload.task,
            action.payload.note,
            action.payload.date
          ),
        ];
      }

    case "DELETE":
      return state.filter((item) => item.id !== action.payload.id);

    case "COMPLETED":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, complete: !item.complete };
        }
        return item;
      });

    default:
      throw new Error(`Invalid action !!`);
  }
}

function newTodo(task, note, date) {
  return {
    id: Date.now(),
    task: task,
    note: note,
    date: date,
    complete: false,
  };
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [notification, setNotification] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    dispatch({ type: "ADD", payload: { task: task, note: note, date: date } });
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 2000);
    setTask("");
    setNote("");
    setDate(null);
  }

  return (
    <div className="mb-20 ">
      <h1 className="text-5xl flex align-text-top justify-center my-4 ">
        To-Do List App
      </h1>
      <div className=" h-full flex justify-center">
        <form
          className="flex flex-col bg-slate-400 p-5 w-96  rounded-2xl shadow-slate-900 shadow-lg"
          onSubmit={submitHandler}
        >
          <label htmlFor="task" className="text-2xl font-semibold">
            Task
          </label>
          <input
            type="text"
            id="task"
            className="border-2 my-2 w-84 h-10 p-1"
            placeholder="I want to do..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <label htmlFor="task" className="text-2xl font-semibold">
            Date
          </label>
          <input
            type="date"
            className="border-2 my-2 w-84 h-10 p-1"
            onSelect={(e) => setDate(e.target.value)}
          />

          <label htmlFor="task" className="text-2xl font-semibold">
            Add Note
          </label>
          <textarea
            className="border-2 my-2 w-84 h-28 p-1 resize-none"
            placeholder="Add Note about task..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <br />
          <button className="bg-slate-800 text-white w-32 h-10 rounded-xl hover:bg-slate-600">
            Add to List
          </button>
        </form>
      </div>

      {notification && state.length !== 0 && (
        <div className="flex justify-center mt-5">
          <h1 className=" text-center last h-10 rounded-2xl w-48 border-2 border-green-700 bg-green-300 p-2">
            Task {state.length} Added to List
          </h1>
        </div>
      )}
      {!notification && state.length === 0 && (
        <div className="flex justify-center mt-5">
          <h1 className=" text-center h-10 rounded-2xl w-60 border-2 border-red-700 bg-red-300 p-2">
            List is Empty ! Add a task.
          </h1>
        </div>
      )}

      <div className=" grid grid-flow-row grid-cols-4 gap-4 m-10">
        {state.map((todo) => {
          return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
        })}
      </div>
    </div>
  );
};

export default App;
