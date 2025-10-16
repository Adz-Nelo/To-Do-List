import React, { useState } from "react";
import tick from "../assets/tick.svg";
import not_tick from "../assets/not_tick.svg";
import delete_icon from "../assets/delete-icon.svg";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTodo(id);
    }, 300);
  };

  const handleToggle = () => {
    toggle(id);
  };

  return (
    <div 
      className={`flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 transform ${
        isDeleting ? 'scale-95 opacity-0 -translate-x-4' : 'scale-100 opacity-100'
      } ${
        isHovered ? 'shadow-md border-gray-200 bg-gray-50' : ''
      } ${
        isComplete ? 'bg-green-50 border-green-200' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Toggle Complete */}
      <div 
        onClick={handleToggle}
        className="flex flex-1 items-center cursor-pointer group min-w-0"
      >
        <div className={`relative transition-all duration-300 flex-shrink-0 ${
          isComplete ? 'transform scale-110' : ''
        }`}>
          <img 
            className={`w-7 transition-all duration-300 ${
              isComplete ? 'filter drop-shadow-lg' : 'opacity-70 group-hover:opacity-100'
            }`} 
            src={isComplete ? tick : not_tick} 
            alt={isComplete ? "Completed" : "Not completed"} 
          />
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isComplete ? 'bg-green-200/30 animate-ping' : 'bg-orange-200/30'
          }`}></div>
        </div>
        <p
          className={`ml-4 text-[16px] font-medium transition-all duration-300 truncate flex-1 min-w-0 ${
            isComplete 
              ? "line-through text-gray-400" 
              : "text-gray-700 group-hover:text-gray-900"
          } ${
            isComplete ? 'transform translate-x-1' : ''
          }`}
        >
          {text}
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className={`p-2 rounded-lg transition-all duration-300 transform flex-shrink-0 ${
          isHovered 
            ? 'opacity-100 scale-100 bg-red-50' 
            : 'opacity-70 scale-90'
        } hover:bg-red-100 active:scale-95 group ml-2`}
        aria-label="Delete task"
      >
        <img
          src={delete_icon}
          alt="Delete"
          className={`w-5 transition-all duration-300 ${
            isHovered ? 'transform scale-110' : ''
          } group-hover:filter group-hover:brightness-125`}
        />
      </button>
    </div>
  );
};

export default TodoItems;