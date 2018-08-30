import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Tab extends Component {
  render() {
    return (
      <NavLink to={this.props.path} activeClassName="active">
        <div className={this.props.className}>
          <span>
            {this.props.title}
          </span>
        </div>
      </NavLink>
    );
  }
}

export default Tab;
