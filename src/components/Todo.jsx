import React, { useEffect, useRef, useState } from "react";
import Todo_icon from "../assets/todo-icon.svg";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      // Add shake animation for empty input
      inputRef.current.classList.add("shake");
      setTimeout(() => {
        inputRef.current.classList.remove("shake");
      }, 500);
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      createdAt: new Date().toISOString(),
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
    
    // Refocus input after adding
    inputRef.current.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  const clearCompleted = () => {
    setTodoList((prevTodos) => prevTodos.filter(todo => !todo.isComplete));
  };

  const completedCount = todoList.filter(todo => todo.isComplete).length;
  const totalCount = todoList.length;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white/95 backdrop-blur-sm place-self-center w-11/12 max-w-md flex flex-col p-8 min-h-[600px] rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-500 hover:shadow-3xl">
      {/* Header */}
      <div className="flex justify-center items-center content-center mt-6 gap-3 transform transition-transform duration-300 hover:scale-105">
        <img className="w-10 drop-shadow-lg" src={Todo_icon} alt="Todo Icon" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
            To-Do List
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {completedCount} of {totalCount} tasks completed
          </p>
        </div>
      </div>

      {/* Stats */}
      {totalCount > 0 && (
        <div className="flex justify-between items-center mt-4 mb-2 px-2">
          <span className="text-sm text-gray-600">
            {completedCount}/{totalCount} completed
          </span>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-xs text-red-500 hover:text-red-700 transition-colors duration-200 font-medium"
            >
              Clear Completed
            </button>
          )}
        </div>
      )}

      {/* Input Box */}
      <div className={`flex items-center my-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl transition-all duration-300 ${
        inputFocused ? 'ring-2 ring-orange-500 shadow-lg transform scale-105' : 'shadow-md'
      }`}>
        <input
          ref={inputRef}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onKeyPress={handleKeyPress}
          className="bg-transparent border-0 outline-none flex-1 h-16 pl-6 pr-2 placeholder:text-gray-500 text-gray-800 text-lg transition-all duration-300"
          type="text"
          placeholder="What needs to be done?"
        />
        <button
          onClick={add}
          className="border-none rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 w-32 h-14 text-white text-lg font-semibold cursor-pointer transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:scale-105 active:scale-95 m-1"
        >
          ADD +
        </button>
      </div>

      {/* Todo List */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {todoList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-lg">No tasks yet</p>
            <p className="text-gray-400 text-sm mt-2">Add a task above to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todoList.map((item) => (
              <TodoItems
                key={item.id}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;