import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, setSizeFilter, setColorFilter } from './actions'
import { TwitterPicker } from 'react-color'

// styles
import './styles.css';


class WordsFilters extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      text: '',
      size: 24,
      color: '',
      colorPickerVisible: false
    }

    // Binding
    this.handleChangeFilterText = this.handleChangeFilterText.bind(this);
    this.handleChangeFilterSize = this.handleChangeFilterSize.bind(this);
    this.handleChangeFilterColor = this.handleChangeFilterColor.bind(this);
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
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

  handleChangeFilterColor(color){
    this.setState({color: color.hex})
    this.props.dispatch(setColorFilter(color.hex));
  }

  toggleColorPicker(){
    this.setState({
      colorPickerVisible: !this.state.colorPickerVisible
    })
  }

  render(){
    return(
      <div className="Filters container">
        <div className="row">
          <div className="col-2">
            <div className="input-group">
                <span className="input-group-text">Filters:</span>
            </div>
          </div>
          <div className="col-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Text</span>
              </div>
              <input
                placeholder="..."
                step="1" min="0"
                className="form-control-sm form-control"
                type="text"
                value={this.state.text}
                onChange={this.handleChangeFilterText}
              />
            </div>
          </div>
          <div className="col-3" align="center">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  onClick={this.toggleColorPicker}
                  >Color
                </span>
              </div>
              <input
                className="form-control-sm form-control"
                type="button"
                style={{backgroundColor: this.state.color}}
                color={this.state.color}
                onClick={this.toggleColorPicker}
              />
            </div>
            {this.state.colorPickerVisible && <TwitterPicker
              disableAlpha={true}
              color={this.state.color}
              onChangeComplete={this.handleChangeFilterColor}
              className="colorPicker"
            />}
          </div>
          <div className="col-3" align="center">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Size</span>
              </div>
              <input
                placeholder="Font Size"
                step="1" min="0"
                className="form-control-sm form-control"
                type="number"
                value={this.state.size}
                onChange={this.handleChangeFilterSize}
              />
            </div>
          </div>
          <div className="col-1"></div>
        </div>
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
