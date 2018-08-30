import React, {Component} from 'react';

class Changer extends Component {
  render() {
    return (
      <select
        defaultValue={this.props.book.shelf ? this.props.book.shelf : 'none'}
        onChange={event =>
          this.props.updateBooks(this.props.book, event.target.value)}>
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option defaultValue value="wantToRead">
          Want to Read
        </option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}

export default Changer;
