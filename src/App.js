import React, { Component } from 'react';

const Header = () => (
  <div className="header grid">
    <h1 className="title">
      Jiffy
    </h1>
  </div>
)

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ''
    }
  };

  // with modern js we dont need constructor and bind for the this keyword
  handleChange = event => {
    // same as const = event.target.value
    const { value } = event.target
    this.setState((prevState, props) => ({
      // we take all our old props and spread them out here
      ...prevState,
      // and then overwrite the ones we want after
      searchTerm: value
    }))
    if (value.length >= 3) {
    }
  };

  // when we have 2 or more characters in our search box and we have also pressed enter, we then want to run a search
  handleKeyPress = event => {
    const { value } = event.target
    if (value.length >= 3 && event.key === 'Enter') {
      alert(`Search for ${value}`)
    }
  }

  render() {
    // const searchTerm = this.state.searchTerm
    const {searchTerm} = this.state
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          <input className="input grid-item" placeholder="Search for a GIF"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}>
          </input>
        </div>
      </div>
    );
  }
}

export default App;
