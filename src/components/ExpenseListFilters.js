import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "../redux/actions/filters";

class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);

    this.state = {
      calendarFocused: null,
    };
  }

  //look at github react-dates then we could find the returned parameters
  onDatesChange({ startDate, endDate }) {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  }

  onFocusChange(calendarFocused) {
    this.setState(() => ({
      calendarFocused,
    }));
  }

  onTextChange(e) {
    this.props.dispatch(setTextFilter(e.target.value));
  }

  onSortChange(e) {
    if (e.target.value === "date") {
      this.props.dispatch(sortByDate());
    } else if (e.target.value === "amount") {
      this.props.dispatch(sortByAmount());
    }
    // console.log(e.target.value);
  }

  render() {
    return (
      //controled input
      <div>
        <input
          type="text"
          defaultValue=""
          //value={props.filters.text}
          onChange={this.onTextChange}
        />

        <select value={this.props.filters.sortBy} onChange={this.onSortChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>

        <DateRangePicker
          startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id"
          endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id"
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);

// const ExpenseListFilters = (props) => (
//   //controled input
//   <div>
//     <input
//       type="text"
//       defaultValue=""
//       //value={props.filters.text}
//       onChange={(e) => {
//         props.dispatch(setTextFilter(e.target.value));
//       }}
//     />

//     <select
//       value={props.filters.sortBy}
//       onChange={(e) => {
//         if (e.target.value === "date") {
//           props.dispatch(sortByDate());
//         } else if (e.target.value === "amount") {
//           props.dispatch(sortByAmount());
//         }
//         // console.log(e.target.value);
//       }}
//     >
//       <option value="date">Date</option>
//       <option value="amount">Amount</option>
//     </select>
//   </div>
// );
