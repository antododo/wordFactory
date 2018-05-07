import { combineReducers } from 'redux';
import { uiReducer }       from 'core/reducers/reducer-ui';
import wordsReducer  from 'containers/SubmitNewWord/reducers'
import filtersReducer from 'containers/WordsFilters/reducers'

const rootReducer = combineReducers({
  ui: uiReducer,
  words: wordsReducer,
  filters: filtersReducer
});

export default rootReducer;
