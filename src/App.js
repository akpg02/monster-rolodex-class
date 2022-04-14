import React, { Component } from "react";
import "./App.css";

import CardList from "./components/card-list/card-list.componet";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  // runs first
  constructor() {
    super();

    // initializes the state
    this.state = {
      monsters: [],
      searchField: "",
    };
    console.log("constructor in App");
  }

  // runs third
  componentDidMount() {
    console.log("component did mount in App");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => console.log(this.state)
        )
      );
  }

  onSearchChange = (event) => {
    let searchField = event.target.value.toLowerCase();
    this.setState({ searchField });
  };

  // runs second
  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );

    console.log("render in App");
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
          className="monsters-search-box"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
