import React from 'react';
import { connect } from 'react-redux';
import {
  addMovieToList,
  handleMovieSearch,
  addMovieToGrid,
  requestApiData,
} from '../redux/actions';
import '../index.css';
import { search } from '../redux/reducers';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  // handleSearch = () => {
  //   const { searchText } = this.state;
  //   this.props.dispatch(handleMovieSearch(searchText));
  // };

  handleSearch = () => {
    const { searchText } = this.state;
    this.props.dispatch(requestApiData(searchText));
  };

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  handleAddToMovies(result) {
    this.props.dispatch(addMovieToList(result));
    this.props.dispatch(addMovieToGrid(result));
    this.setState({
      showSearchResults: false,
    });
  }

  render() {
    const { result, showSearchResults } = this.props.search;

    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={result.Poster} alt="search-pic" />

                <div className="movie-info">
                  <span>{result.Title}</span>
                  <button onClick={() => this.handleAddToMovies(result)}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('apiData=', state.apiData);
  console.log('search state=', state.search);
  return {
    search: state.search,
    apiData: state.apiData,
  };
}

const connectedNavbarComponent = connect(mapStateToProps)(Navbar);

export default connectedNavbarComponent;
