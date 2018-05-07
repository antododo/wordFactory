import React, { Component }   from 'react'
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }         from 'react-router-dom';

/* component styles */
import { styles } from './styles.scss';

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui';

// Components & containers
import AllWords from 'containers/AllWords'
import SubmitNewWord from 'containers/SubmitNewWord'
import WordsFilters from 'containers/WordsFilters'

class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>
        <div id="home-view">
         Home View
         <WordsFilters></WordsFilters>
         <AllWords></AllWords>
         <SubmitNewWord></SubmitNewWord>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default withRouter(
  connect(null, mapDispatchToProps)(HomeView)
)
