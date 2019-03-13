import React, { Component } from 'react';

import loader from './images/loader.svg'
import close from './images/close-icon.svg'

const Header = () => (
  <div className="header grid">
    <h1 className="title">
      Jiffy
    </h1>
  </div>
)

const UserHint = ({loading, hintText}) => (
  <div className="user-hint">
    {/* here we check whether we have a loading state and render out either our sponner or hintText
    using a tenary operator if else statement*/}
    {loading ? <img className="block mx-auto" src={loader} /> : hintText}
  </div>
)

class App extends Component {

  constructor(props) {
    super(props)

    // default states
    this.state = {
      searchTerm: '',
      hintText: ''
    }
  };

  // with modern js we dont need constructor and bind for the this keyword, just for the state
  handleChange = event => {
    // same as const = event.target.value
    const { value } = event.target
    this.setState((prevState, props) => ({
      // we take all our old props and spread them out here
      ...prevState,
      // and then overwrite the ones we want after
      searchTerm: value,
      // we set the hintText only when we have more than 2 characters, else we set it an empty string
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
    }))
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
        {/* here we pass UserHint all of our state using a spread*/}
        <UserHint {...this.state}/>
      </div>
    );
  }
}

export default App;
