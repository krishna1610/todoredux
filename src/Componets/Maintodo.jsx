import React from "react";
//import Footer from "./Footer";
import { connect } from "react-redux";

// import connect from react-redux lib
// define two function mapStateToProps and mapDispatchToProps
// make changes to export default

const isUncheckedItem = (item) => {
  //{text:"dcd",check:true}
  if (item.check === false) return true;
  else return false;
};

const isCheckedItem = (item) => {
  if (item.check === true) return true;
  else return false;
};

const Maintodos = (props) => {
  return (
    <div>
      <h1 className="todos">todos</h1>

      <input
        className="new_todo"
        type="text"
        placeholder="What needs to be done?"
        onKeyPress={(event) => {
          props.onInputKeyPressed(event);
        }}
      />
      <ul>
        {props.items
          .filter((item) => {
            if (props.filterSelected === "all") {
              return true; // show all items
            } else if (props.filterSelected === "active") {
              return item.check == false;
            } else {
              return item.check == true;
            }
          })
          .map((item) => {
            return (
              <li>
                <input
                  type="checkbox"
                  checked={item.check}
                  onChange={() => {
                    props.onCheckboxChanged(item);
                  }}
                ></input>

                <span>{item.text}</span>

                <button
                  className="deletebtn"
                  className="button"
                  onClick={() => {
                    props.onDeleteItemClicked(item);
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
      </ul>
      {/* {props.items.length > 0 && (
        <Footer
          activeItems={props.items.filter(isUncheckedItem)}
          completedItems={props.items.filter(isCheckedItem)}
        />
      )} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    items: state.items,
    filterSelected: state.selectedFilter,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onInputKeyPressed: (e) => {
    if (e.key == "Enter") {
      console.log(e.target.value);
      dispatch({
        type: "ADD_ITEM",
        newItem: { text: e.target.value, check: false },
      });
      e.target.value = "";
    }
  },

  onCheckboxChanged: (item) => {
    dispatch({ type: "CHECK_UNCHECK_ITEM", item: item });
  },

  onDeleteItemClicked: (item) => {
    dispatch({ type: "DELETE_ITEM", item: item });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Maintodos);
