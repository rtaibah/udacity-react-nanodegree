import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {submitPost} from '../actions';
import {connect} from 'react-redux';

class Submit extends Component {
  renderField(field) {
    const {meta: {touched, error}} = field;
    const dangerInput = `${touched && error ? 'danger' : ''}`;
    return (
      <div className="Submit__input">
        <label>{field.label}</label>
        <input
          className={dangerInput}
          type={field.type}
          placeholder={field.placeholder}
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
          type={textArea.type}
          placeholder={textArea.placeholder}
          {...textArea.input}
        />
        <div className="Submit__textarea__error">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.submitPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="Submit__wrapper">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            placeholder="Enter post title"
            type="text"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            placeholder="Enter post categories"
            type="text"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            type="textarea"
            placeholder="Enter post content"
            component={this.renderTextArea}
          />
          <div>
            <Link to="/" className="Submit__cancel">
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

  if (!values.categories) {
    errors.categories = 'Please enter a category';
  }

  if (!values.content) {
    errors.content = 'Please enter some content';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostSubmitForm',
})(connect(null, {submitPost})(Submit));
