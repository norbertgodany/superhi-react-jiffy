import React, { Component } from 'react';
import Gif from './Gif'

import loader from './images/loader.svg'
import clearButton from './images/close-icon.svg'

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

// we pick out our props inside the header component 
// we can pass down the functions as props as well as things
// like numbers, strings, arrays, or objects
const Header = ({ clearSearch, hasResults }) => (
  <div className="header grid">
    {hasResults ?
      <button onClick={clearSearch}>
        <img src={clearButton} />
      </button> : <h1 className="title">Jiffy</h1>}
  </div>
)

const UserHint = ({ loading, hintText }) => (
  <div className="user-hint">
    {/* here we check whether we have a loading state and render out either our sponner or hintText
    using a tenary operator if else statement*/}
    {loading ? <img className="block mx-auto" src={loader} /> : hintText}
  </div>
)

// reset the state by clearing everything out

class App extends Component {

  constructor(props) {
    super(props)

    // default states
    this.state = {
      loading: false,
      searchTerm: '',
      hintText: '',
      gifs: []
    }
  };

  // requesting giphy api for data, async
  searchGiphy = async searchTerm => {

    // we set our loading state to be true, to show the spinner
    this.setState({
      loading: true
    })

    try {
      // here we use await to wait for the response to come back
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=bJ6ZQrR61ErHVtVkdLaljkc1t44oCXKM&q=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`)

      //converting raw response into json
      // const {data} gets the .data part of our response
      const { data } = await response.json()

      // here we check if the array of results is empty
      // if it is, we throw an error which will stop the code here
      // and handle it in the catch area

      if (!data.length) {
        throw `Nothing found for ${searchTerm}`
      }

      // here we grab a random result from the images
      const randomGif = randomChoice(data)

      this.setState((prevState, props) => ({
        ...prevState,
        // ge the first result and put it in the state
        // here we use our spread to take the previous gifs and
        // spread them out, and then add our new random gif
        // onto the end
        gifs: [...prevState.gifs, randomGif],
        // we turn off our loading spinner again
        loading: false,
        hintText: `Hit enter to search for more ${searchTerm}`
      }))

    } catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: error,
        loading: false
      }))
      console.log(error)
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
      // we call our searchGiphy function with the searchTerm
      this.searchGiphy(value)
    }
  }

  // here we reset our states and make everything default again

  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: '',
      hintText: '',
      gifs: []
    }))
    // here we grab the input and focus the cursor back into it
    this.textInput.focus();
  }

  render() {
    // const searchTerm = this.state.searchTerm
    const { searchTerm, gifs } = this.state
    // here we set a variable to see if we have any gifs
    const hasResults = gifs.length
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />

        <div className="search grid">

          {this.state.gifs.map(gif => (
            // we spread all of our properties onto our Gif component
            <Gif {...gif} />
          ))}

          <input className="input grid-item" placeholder="Search for a GIF"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
            ref={(input) => {
              this.textInput = input;
              }}
          />
        </div>
        {/* here we pass UserHint all of our state using a spread*/}
        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
