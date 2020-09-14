import React from "react";
import {connect} from "react-redux";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="row">
          <div className="col-3 item">
            {this.props.activeItems.length == 1 ? (
              <p>{this.props.activeItems.length} item left</p>
            ) : (
              <p>{this.props.activeItems.length} items left</p>
            )}
          </div>
          <div className="col-5">
            <input
              className="footerradio"
              onChange={(e) => {
                this.props.onFilterRadioChanged(e);
              }}
              type="radio"
              id="filter1"
              name="filter"
              value="all"
              checked={this.props.selectedFilter === "all"}
            ></input>
            <label for="filter1">All</label>
            <input
              className="footerradio"
              onChange={(e) => {
                this.props.onFilterRadioChanged(e);
              }}
              type="radio"
              id="filter2"
              name="filter"
              value="active"
              checked={this.props.selectedFilter === "active"}
            ></input>
            <label for="filter2">Active</label>
            <input
              className="footerradio"
              onChange={(e) => {
                this.props.onFilterRadioChanged(e);
              }}
              type="radio"
              id="filter3"
              name="filter"
              value="completed"
              checked={this.props.selectedFilter === "completed"}
            ></input>
            <label for="filter3">Completed</label>
          </div>
          <div className="col-4">
            {this.props.completedItems.length > 0 && (
              <button
                className="footerbtn"
                onClick={() => {
                  this.props.onClearCompletedClicked();
                }}
              >
                Clear Completed
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({ selectedFilter : store.selectedFilter }); // this.state

const mapDispatchToProps = (dispatch) => ({ // this.fun
  onFilterRadioChanged: (e) => {
    dispatch({ type: "CHANGE_FILTER",newFilter:e.target.value });
  },
  onClearCompletedClicked: () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  },
});

const myConnect = connect(mapStateToProps, mapDispatchToProps); //fuction

export default myConnect(Footer);
