import { combineReducers } from 'redux';
import { uiReducer }       from 'core/reducers/reducer-ui';
import wordsReducer  from 'containers/SubmitNewWord/reducers'

const rootReducer = combineReducers({
  ui: uiReducer,
  words: wordsReducer
});

export default rootReducer;
