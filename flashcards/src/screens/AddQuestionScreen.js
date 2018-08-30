import React, { Component } from 'React';
import { Platform, View, Text } from 'react-native';
import { Button, FormValidationMessage, FormLabel, FormInput } from 'react-native-elements';
import { addCard } from '../actions/decks';
import { connect } from 'react-redux';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';

class AddQuestionScreen extends Component {
  state = {
    question: '',
    questionError: false,
    answer: '',
    answerError: false,
  };

  onChangeQuestion = question => {
    this.setState({ question });
    if (question.length === 1) {
      this.setState({ questionError: false });
    }
  };

  onChangeAnswer = answer => {
    this.setState({ answer });
    if (answer.length === 1) {
      this.setState({ answerError: false });
    }
  };

  handleAdd = () => {
    const { question, answer, questionError, answerError } = this.state;
    const { id } = this.props.navigation.state.params;

    if (question.length === 0 && answer.length === 0) {
      return this.setState({ questionError: true, answerError: true });
    }

    if (question.length === 0) {
      return this.setState({ questionError: true });
    }

    if (answer.length === 0) {
      return this.setState({ answerError: true });
    }

    if (!questionError && !answerError) {
			this.setState({question:'',answer:''})
      this.questionInput.clearText();
      this.answerInput.clearText();
      this.props.addCard(question, answer, id);
    }
  };

  handleDone = () => {
    const resetActions = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'home' })],
    });
    this.props.navigation.dispatch(resetActions);
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#3066be',
        marginTop: Platform.OS === 'android' ? 24 : 0,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitleStyle: { color: 'white' },
      headerTintColor: 'white',
    };
  };

  render() {
    return (
      <View>
        <FormLabel>QUESTION</FormLabel>
        <FormInput ref={input => (this.questionInput = input)} onChangeText={this.onChangeQuestion} />
        {this.state.questionError ? (
          <FormValidationMessage containerStyle={{ height: 30 }}>Question is required</FormValidationMessage>
        ) : (
          <FormValidationMessage containerStyle={{ height: 30 }} />
        )}
        <FormLabel>ANSWER</FormLabel>
        <FormInput ref={input => (this.answerInput = input)} onChangeText={this.onChangeAnswer} />
        {this.state.answerError ? (
          <FormValidationMessage containerStyle={{ height: 30 }}>Answer is required</FormValidationMessage>
        ) : (
          <FormValidationMessage containerStyle={{ height: 30 }} />
        )}

        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <Button title="Add & Create Another" onPress={this.handleAdd} backgroundColor="#3066be" />
          <Button
            title={this.state.question.length === 0 && this.state.answer.length === 0 ? 'Done' : 'Cancel'}
            onPress={this.handleDone}
            backgroundColor="#3066be"
          />
        </View>
      </View>
    );
  }
}

export default connect(null, { addCard })(AddQuestionScreen);
