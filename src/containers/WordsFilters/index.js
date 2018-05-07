import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from './actions'


class WordsFilters extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      text: 'h'
    }

    // Binding
    this.handleChangeFilterText = this.handleChangeFilterText.bind(this);
  }


  // Handle Filter text change
  handleChangeFilterText(event){
    this.setState({text: event.target.value})
    this.props.dispatch(setTextFilter(event.target.value));
  }

  render(){
    return(
      <div>
        <p>Filters</p>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChangeFilterText}
        />
        <select>
          <option value="text">Text</option>
          <option value= "color">Color</option>
          <option value= "size">Size</option>
          <option value= "owner">Owner</option>
          <option value= "time">Time</option>
        </select>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}


export default connect(mapStateToProps)(WordsFilters);
