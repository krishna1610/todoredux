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
    case "ADD_ITEM": // action = { type, newItem }, newItem = { text, check }
      let newItem = action.newItem; // object-->{text,check}
      let allItems = state.items; //array of object ,object-->{text,check}
      allItems.push(newItem);
      console.log(allItems);
      return {
        ...state,
        items: allItems,
      };
      break;
    case "CHECK_UNCHECK_ITEM": // action = { type, item }, item = { text, check }
      let checkAllItems = state.items; // local copy of items array in state
      let item = action.item; //object
      let index = checkAllItems.indexOf(item); //number
      checkAllItems[index].check = !checkAllItems[index].check; // Toggle check value
      return {
        ...state,
        items: checkAllItems,
      };
      break;
    case "DELETE_ITEM": // action = { type, item }, item = { text, check }
      let deleteAllItems = state.items;
      let selectedItem = action.item;
      let delIndex = deleteAllItems.indexOf(selectedItem);
      deleteAllItems.splice(delIndex, 1);
      return {
        ...state,
        items: deleteAllItems,
      };
      break;
    case "CHANGE_FILTER": // action = { type, newFilter }, newFilter = 'all', 'active', 'completed'
      let newFilter = action.newFilter; //string
      return {
        ...state,
        selectedFilter: newFilter,
      };
      break;
    case "CLEAR_COMPLETED": // action = { type }
      let clearAllItems = state.items;//copy items into allItems
      let uncheckedItems = clearAllItems.filter((item) => {
        if (item.check === false) return true;
        else return false;
      });
      return {
        ...state,
        items: uncheckedItems,
      };
      break;
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
