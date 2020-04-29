import React, { Component } from "react";
import Moment from "react-moment";
import "moment-timezone";
import { Alert } from "reactstrap";
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.componentDidMount();
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
  check = (e) => {
    e.preventDefault();
    console.log("We checked", e.target.value);
    let id = e.target.value;
    fetch("/api/check" + id, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.getLists();
      });
  };
  unCheck = (e) => {
    e.preventDefault();
    let id = e.target.value;
    fetch("/api/uncheck" + id, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.getLists();
      });
  };
  delete = (e) => {
    e.preventDefault();
    console.log("we deleted", e.target.value);
    let id = e.target.value;
    fetch("/api/delete" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.getLists();
      });
  };
  onKeyPress = (e) => {
    if (e.which === 13) {
      this.submit();
    }
  };

  render() {
    const todos = this.state.unchecked.map((el, index) => (
      <span key={index}>
        <Alert color="primary">
          <button value={el.id} onClick={(this.check = this.check.bind(this))}>
            &#10003;
          </button>
          {el.items}
          <button
            value={el.id}
            onClick={(this.delete = this.delete.bind(this))}
          >
            X
          </button>
        </Alert>
      </span>
    ));
    const done = this.state.checked.map((el, index) => (
      <span key={index}>
        <Alert color="danger">
          <button
            value={el.id}
            onClick={(this.unCheck = this.unCheck.bind(this))}
          >
            un - &#10003;
          </button>
          {el.items}
          <button
            value={el.id}
            onClick={(this.delete = this.delete.bind(this))}
          >
            X
          </button>
        </Alert>

        <br />
      </span>
    ));
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
        <p>To Do</p>
        <div>{todos}</div>
        <p>Done</p>
        <div>{done}</div>
      </div>
    );
  }
}
