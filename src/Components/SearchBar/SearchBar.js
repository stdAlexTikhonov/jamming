import React, { Component } from 'react';
import './SearchBar.css';





class SearchBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);

  }
  
  search() {
    this.props.onSearch(this.state.term);
  }
  
  handleTermChange(e) {
    let term = e.target.value;
    this.setState({
      term: term
    });
  }
  
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;