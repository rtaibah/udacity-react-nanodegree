import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Tabs extends Component {
  render() {
    return (
      <div className="tabs">
        <NavLink to="/reading" activeClassName="active">
          <div className="currently-reading-tab">
            <span>Currently Reading</span>
          </div>
        </NavLink>
        <NavLink to="/want" activeClassName="active">
          <div className="want-to-read-tab">
            <span>Want to Read</span>
          </div>
        </NavLink>
        <NavLink to="/read" activeClassName="active">
          <div className="already-read-tab">
            <span>Read</span>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Tabs;
