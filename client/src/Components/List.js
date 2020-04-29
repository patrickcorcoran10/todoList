import React, { Component } from "react";
import Moment from "react-moment";
import "moment-timezone";
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      unchecked: [],
      checked: [],
    };
  }
  componentDidMount() {
    this.getLists();
  }
  handleInput = (e) => {
    this.setState({
      input: e.target.value,
    });
  };
  submit = (e) => {
    e.preventDefault();
    console.log("submitted");
    const data = { items: this.state.input };

    fetch("/api/add", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  async getLists() {
    const res = await fetch("/api/getToDos");
    const data = await res.json();
    const resDone = await fetch("/api/getDones");
    const dataDone = await resDone.json();
    this.setState({
      unchecked: data,
      checked: dataDone,
    });

    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h3>TO DO's for</h3>
        <br />
        <h3>
          <Moment titleFormat="D MMM YYYY"></Moment>
        </h3>
        <p>Add Item:</p>
        <input
          placeholder="New Item"
          onChange={(this.handleInput = this.handleInput.bind(this))}
        />
        <button onClick={(this.submit = this.submit.bind(this))}>Add</button>
      </div>
    );
  }
}
