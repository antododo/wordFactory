import { combineReducers } from 'redux';
// import { uiReducer }       from 'core/reducers/reducer-ui';
import wordsReducer  from './../../containers/AllWords/reducers'
import filtersReducer from './../../containers/WordsFilters/reducers'
import submitingWordReducer from './../../containers/SubmitNewWord/reducers'

const rootReducer = combineReducers({
  // ui: uiReducer,
  words: wordsReducer,
  filters: filtersReducer,
  submitingWord: submitingWordReducer
});

export default rootReducer;
