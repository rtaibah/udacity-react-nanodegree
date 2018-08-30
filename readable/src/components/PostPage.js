import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getSinglePost,
  getComments,
  submitVote,
  submitVoteComment,
  deletePost,
  deleteComment,
} from '../actions';
import _ from 'lodash';
import moment from 'moment';
import {Link} from 'react-router-dom';

class PostPage extends Component {
  componentWillMount() {
    let {post_id} = this.props.match.params;
    this.props.getComments(post_id);
    this.props.getSinglePost(post_id);
  }

  render() {
    // Find number of comments
    let comments = this.props.comments.filter(
      comment => comment.parentId === this.props.match.params.post_id,
    );

    return (
      <div className="Single-Post__wrapper">
        {this.props.singlePost ? this.props.singlePost.deleted ? (
          <div className="Deleted__wrapper">
            <i className="fa fa-trash-o" aria-hidden="true" />
            <h4>Successfully deleted post</h4>
            <Link to="/">Go back to home</Link>
          </div>
        ) : (
          <div>
            <div className="Post__wrapper">
              <div className="Post">
                <div className="Post__header">
                  <ul className="Post__vote">
                    <li
                      className="Post__upvote"
                      onClick={() =>
                        this.props.submitVote({
                          option: 'upVote',
                          postId: this.props.singlePost.id,
                        })}>
                      ^
                    </li>
                    <li>
                      <p className="Post__score">
                        {this.props.singlePost.voteScore}
                      </p>
                    </li>
                    <li
                      className="Post__downvote"
                      onClick={() =>
                        this.props.submitVote({
                          option: 'downVote',
                          postId: this.props.singlePost.id,
                        })}>
                      ^
                    </li>
                  </ul>
                  <h5 className="Post__title">{this.props.singlePost.title}</h5>
                </div>
                <ul className="Post__info">
                  <li>
                    submitted on{' '}
                    {moment(this.props.singlePost.timestamp).format('LL')}
                  </li>
                  <li> by {this.props.singlePost.author}</li>
                  <li> to {this.props.singlePost.category}</li>
                  <li> and has {comments.length} comments</li>
                  <li
                    className="Post__delete"
                    onClick={() =>
                      this.props.deletePost(this.props.singlePost.id)}>
                    delete
                  </li>
                  <li className="Post__edit">
                    <Link
                      to={`/${this.props.singlePost.category}/${this.props
                        .singlePost.id}/edit`}>
                      edit
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="Post__body">{this.props.singlePost.body}</div>
            <div className="Comments__wrapper">
              <h5>comments</h5>
              <Link
                className="Comments__add"
                to={`/${this.props.match.params.category}/${this.props.match
                  .params.post_id}/comment`}>
                Add a comment
              </Link>
              <ul className="Comments_list">
                {comments.map(comment => (
                  <li key={comment.id} className="Single-comment">
                    <ul className="Comments__vote-button">
                      <li
                        key="upvote"
                        className="Comments__upVote"
                        onClick={() =>
                          this.props.submitVoteComment({
                            option: 'upVote',
                            commentId: comment.id,
                          })}>
                        ^
                      </li>
                      <li
                        key="downvote"
                        className="Comments__downVote"
                        onClick={() =>
                          this.props.submitVoteComment({
                            option: 'downVote',
                            commentId: comment.id,
                          })}>
                        ^
                      </li>
                    </ul>
                    <ul className="Single-comment__metadata">
                      <li className="Single-comment__author">
                        {comment.author}
                      </li>
                      <li className="Single-comment__vote">
                        {comment.voteScore} points
                      </li>
                      <li className="Single-comment__timestamp" />
                    </ul>
                    <div className="Single-comment__body">{comment.body}</div>
                    <ul className="Single-comment__options">
                      <li
                        className="Single-comment__delete"
                        onClick={() => this.props.deleteComment(comment.id)}>
                        delete
                      </li>
                      <li className="Single-comment__edit">
                        <Link
                          to={`/${this.props.match.params.category}/${this.props
                            .match.params.post_id}/${comment.id}/edit`}>
                          edit
                        </Link>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>Post does not exist :(</div>
        )}
      </div>
    );
  }
}

function mapStateToProps({Posts, Comments}, ownProps) {
  return {
    singlePost: Posts[ownProps.match.params.post_id],
    comments: _.values(Comments),
  };
}

export default connect(mapStateToProps, {
  getSinglePost,
  getComments,
  submitVote,
  submitVoteComment,
  deletePost,
  deleteComment,
})(PostPage);
