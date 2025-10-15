import React from "react";
import tick from "../assets/tick.svg";
import not_tick from "../assets/not_tick.svg";
import delete_icon from "../assets/delete-icon.svg";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      {/* Toggle complete */}
      <div onClick={() => toggle(id)} className="flex flex-1 items-center cursor-pointer">
        <img className="w-8" src={isComplete ? tick : not_tick} alt="" />
        <p
          className={`ml-4 text-[17px] ${
            isComplete ? "line-through text-gray-400" : "text-slate-700"
          }`}
        >
          {text}
        </p>
      </div>

      {/* Delete todo */}
      <img
        onClick={() => deleteTodo(id)}
        src={delete_icon}
        alt="delete"
        className="w-5 cursor-pointer"
      />
    </div>
  );
};

export default TodoItems;
