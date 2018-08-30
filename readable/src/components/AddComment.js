import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {addComment} from '../actions';
import {connect} from 'react-redux';

class AddComment extends Component {
  renderTextArea(textArea) {
    const {meta: {touched, error}} = textArea;
    const dangerTextArea = `${touched && error ? 'danger' : ''}`;
    return (
      <div className="Submit__textarea">
        <label>{textArea.label}</label>
        <br />
        <textarea
          className={dangerTextArea}
          name={textArea.body}
          type={textArea.type}
          {...textArea.input}
        />
        <div className="Submit__textarea__error">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.addComment(values, this.props.match.params.post_id, () => {
      this.props.history.push(
        `/${this.props.match.params.category}/${this.props.match.params
          .post_id}`,
      );
    });
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="EditComment__wrapper">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h4 className="EditComment__Title">Add Comment</h4>

          <Field
            label="Comment"
            name="body"
            type="textarea"
            component={this.renderTextArea}
          />
          <div>
            <Link
              to={`/${this.props.match.params.category}/${this.props.match
                .params.post_id}`}
              className="Submit__cancel">
              Cancel
            </Link>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.body) {
    errors.body = 'Please enter a comment';
  }
  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: state.Comments,
  };
}

let InitializeFromStateForm = reduxForm({
  form: 'CommentEditForm',
  enableReinitialize: true,
  validate,
})(AddComment);

InitializeFromStateForm = connect(mapStateToProps, {
  addComment,
})(InitializeFromStateForm);

export default InitializeFromStateForm;
