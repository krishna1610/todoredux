import React from "react";
import Footer from "./Footer";
import { connect } from "react-redux";

// import connect from react-redux lib
// define two function mapStateToProps and mapDispatchToProps
// make changes to export default

class Maintodos extends React.Component {

  isUncheckedItem = (item) => {
    if (item.check === false) return true;
    else return false;
  };

  isCheckedItem = (item) => {
    if (item.check === true) return true;
    else return false;
  };

  render() {
    return (
      <div>
        <h1 className="todos">todos</h1>

        <input
          className="new_todo"
          type="text"
          placeholder="What needs to be done?"
          onKeyPress={(event) => {
            this.props.onInputKeyPressed(event)
          }}
        />
        <ul>
          {this.props.items.filter((item) => {
            if (this.props.filterSelected === "all") {
              return true; // show all items
            } else if (this.props.filterSelected === "active") {
              return item.check === false; // show unchecked items only
            } else {
              return item.check === true; // show checked items only
            }
          }).map((item) => {
            return (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={item.check}
                  onChange={() => {
                    this.props.onCheckboxChanged(item)
                  }}
                />

                <span>{item.text}</span>

                <button
                  className="deletebtn"
                  onClick={() => {
                    this.props.onDeleteItemClicked(item)
                  }}
                >
                  X
              </button>
              </li>
            );
          })}
        </ul>
        {this.props.items.length > 0 && (
          <Footer
            activeItems={this.props.items.filter(this.isUncheckedItem)}
            completedItems={this.props.items.filter(this.isCheckedItem)}
          />
        )}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    items: state.items,
    filterSelected: state.selectedFilter,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInputKeyPressed: (e) => {
      if (e.key === "Enter") {
        dispatch({
          type: "ADD_ITEM",
          newText: e.target.value,
        });
        e.target.value = "";
      }
    },

    onCheckboxChanged: (item) => {
      dispatch({ type: "CHECK_UNCHECK_ITEM", id: item.id });
    },

    onDeleteItemClicked: (item) => {
      dispatch({ type: "DELETE_ITEM", id: item.id });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Maintodos);
