import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {editPost} from '../actions';
import {connect} from 'react-redux';
import {getSinglePost} from '../actions';

class EditPost extends Component {
  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.post_id);
  }

  renderField(field) {
    const {meta: {touched, error}} = field;
    const dangerInput = `${touched && error ? 'danger' : ''}`;
    return (
      <div className="Submit__input">
        <label>{field.label}</label>
        <input
          name={field.name}
          className={dangerInput}
          type={field.type}
          {...field.input}
        />
        <div className="Submit__input__error">{touched ? error : ''}</div>
      </div>
    );
  }

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
    this.props.editPost(values, this.props.match.params.post_id, () => {
      this.props.history.push(
        `/${this.props.match.params.category}/${this.props.match.params
          .post_id}`,
      );
    });
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="EditPost__wrapper">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h4 className="EditPost__Title">Edit Post</h4>
          <Field
            label="Title"
            name="title"
            type="text"
            component={this.renderField}
          />

          <Field
            label="Post Content"
            name="content"
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
  if (!values.title) {
    errors.title = 'Please enter a title';
  }
  if (!values.body) {
    errors.body = 'Please enter some content';
  }
  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: state.Posts[ownProps.match.params.post_id],
  };
}

let InitializeFromStateForm = reduxForm({
  form: 'PostEditForm',
  enableReinitialize: true,
  validate,
})(EditPost);

InitializeFromStateForm = connect(mapStateToProps, {editPost, getSinglePost})(
  InitializeFromStateForm,
);

export default InitializeFromStateForm;
