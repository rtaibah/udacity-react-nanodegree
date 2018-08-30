// React
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Redux
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import ReduxPromise from 'redux-promise';

// Reducers
import rootRedcer from './reducers';

// Components
import Posts from './components/Posts';
import Submit from './components/Submit';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';
import EditComment from './components/EditComment';
import AddComment from './components/AddComment';

// Router
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootRedcer,
  composeEnhancers(applyMiddleware(ReduxPromise)),
);

ReactDOM.render(
  <div className="App">
    <div className="App__header">
      <h1>
        <a href="/">READABLE</a>
      </h1>
    </div>

    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/submit" component={Submit} />
          <Route
            path="/:category/:post_id/:comment_id/edit"
            component={EditComment}
          />
          <Route path="/:category/:post_id/edit" component={EditPost} />
          <Route path="/:category/:post_id/comment" component={AddComment} />
          <Route path="/:category/:post_id" component={PostPage} />
          <Route path="/:category" component={Posts} />
          <Route path="/" component={Posts} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </div>,
  document.getElementById('root'),
);
