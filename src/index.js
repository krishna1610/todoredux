import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";

// 1) install npm install redux and npm install react-redux
// 2) import createStore function from redux
// 3) import Provider component from react-redux
// 4) define reducer function named myReducer
// 5) call the createStore and pass myReducer function as argument and store the return value into myStore var
// 6) add Provider component and pass myStrore the the Component
// 7) add App component as a child of Provider

// Thought
// state --> what needs to be stored in state
// action.type --> what are possible actions which can change state
// const myReducer = (state, action) => {
//   return state;
// };
const myReducer = (
  state = {
    items: [], // array of object, object --> { text, check }
    selectedFilter: "all", // string
  },
  action
) => {
  switch (action.type) {
    case "ADD_ITEM": // action = { type, newText }, newText = string
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: state.items.length,
            text: action.newText,
            check: false
          }
        ]
      };
    case "CHECK_UNCHECK_ITEM": // action = { type, id }, id = 0, 1, 2, 3, etc.
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.id) { // Toggle check
            return {
              ...item,
              check: !item.check
            };
          } else {
            return item;
          }
        }),
      };
    case "DELETE_ITEM": // action = { type, id }, id = 0, 1, 2, 3, etc.
      return {
        ...state,
        items: state.items.filter((item) => {
          if (item.id !== action.id) {
            return true;
          } else {
            return false;
          }
        }),
      };
    case "CHANGE_FILTER": // action = { type, newFilter }, newFilter = 'all', 'active', 'completed'
      return {
        ...state,
        selectedFilter: action.newFilter,
      };
    case "CLEAR_COMPLETED": // action = { type }
      return {
        ...state,
        items: state.items.filter((item) => {
          if (item.check === false) return true;
          else return false;
        }),
      };
    default:
      return state;
  }
};

const myStore = createStore(myReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
