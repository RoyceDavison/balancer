import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      des: props.expense ? props.expense.des : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: "",
    };
  }

  onDescriptionChange(e) {
    const description = e.target.value;
    this.setState(() => {
      return {
        des: description,
      };
    });
  }

  onNoteChange(e) {
    const note = e.target.value;
    this.setState(() => ({ note }));
  }

  onAmountChange(e) {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amount,
      }));
    }
  }

  onDateChange(createdAt) {
    //prevent the user to enter "DELETE" to delete the data
    if (createdAt) {
      this.setState(() => ({
        createdAt,
      }));
    }
  }

  onFocusChange({ focused }) {
    this.setState(() => ({
      calendarFocused: focused,
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.des || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount.",
      }));
    } else {
      this.setState(() => ({
        error: "",
      }));

      //pass down to AddExpensePage
      this.props.onSubmit({
        des: this.state.des,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(), //from moment() library,
        note: this.state.note,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <h3>{this.state.error}</h3>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.des}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            id="datePicker"
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={(day) => false}
          />
          <textarea
            value={this.state.note}
            onChange={this.onNoteChange}
            placeholder="Add a note for your expense (optional)"
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
