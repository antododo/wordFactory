import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, setSizeFilter, setColorFilter } from './actions'

// styles
import {styles} from './styles.scss';


class WordsFilters extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      text: '',
      size: 24,
      color: ''
    }

    // Binding
    this.handleChangeFilterText = this.handleChangeFilterText.bind(this);
    this.handleChangeFilterSize = this.handleChangeFilterSize.bind(this);
    this.handleChangeFilterColor = this.handleChangeFilterColor.bind(this);
  }


  // Handle Filter change
  handleChangeFilterText(event){
    this.setState({text: event.target.value})
    this.props.dispatch(setTextFilter(event.target.value));
  }

  handleChangeFilterSize(event){
    // TODO ADD Check for number only
    this.setState({size: event.target.value})
    this.props.dispatch(setSizeFilter(event.target.value));
  }

  handleChangeFilterColor(event){
    this.setState({color: event.target.value})
    this.props.dispatch(setColorFilter(event.target.value));
  }

  render(){
    return(
      <div className={styles}>
        <h1>Filters</h1>

        <div className="pure-g">
          <div className="pure-u-1-3">
            <p>Text</p>
            <input
              type="text"
              value={this.state.text}
              onChange={this.handleChangeFilterText}
            />
          </div>
          <div className="pure-u-1-3">
            <p>Color</p>
            <input
              type="text"
              value={this.state.color}
              onChange={this.handleChangeFilterColor}
            />
          </div>
          <div className="pure-u-1-3">
            <p>Font Size</p>
            <input
              type="number"
              min="0"
              value={this.state.size}
              onChange={this.handleChangeFilterSize}
            />
          </div>
        </div>

        {/* TODO Useless? */}
        <select>
          <option value="text">Text</option>
          <option value="color">Color</option>
          <option value="size">Size</option>
          <option value="owner">Owner</option>
          <option value="time">Time</option>
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
