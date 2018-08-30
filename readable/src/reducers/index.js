import categoriesReducer from './Categories';
import postsReducer from './Posts';
import commentsReducer from './Comments';
import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  Categories: categoriesReducer,
  Posts: postsReducer,
  Comments: commentsReducer,
  form: formReducer,
});

export default rootReducer;
