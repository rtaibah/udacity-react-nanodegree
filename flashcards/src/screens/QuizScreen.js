import React, { Component } from 'React';
import { Dimensions, Platform, View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { clearLocalNotification, setLocalNotification } from '../util/notifications';

class QuizScreen extends Component {
  state = {
    numberOfCards: this.props.questions.length,
    currentCard: 1,
    correct: 0,
    incorrect: 0,
    viewAnswer: false,
  };

  static navigationOptions = ({ navigation }) => {
    const DeckTitle = navigation.state.params.title;
    return {
      title: `${DeckTitle}`,
      headerStyle: {
        backgroundColor: '#3066be',
        marginTop: Platform.OS === 'android' ? 24 : 0,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    };
  };

  toggleAnswer = () => {
    this.setState({ viewAnswer: !this.state.viewAnswer });
  };

  handleCorrect = () => {
    const { currentCard, correct } = this.state;
    this.setState({ correct: correct + 1, currentCard: currentCard + 1 });
    this.toggleAnswer();
  };

  handleIncorrect = () => {
    const { currentCard, incorrect } = this.state;
    this.setState({ incorrect: incorrect + 1, currentCard: currentCard + 1 });
    this.toggleAnswer();
  };

  startOver = () => {
    this.setState({
      currentCard: 1,
      correct: 0,
      incorrect: 0,
      viewAnswer: false,
    });
  };

  differentDeck = () => {
    const { title, id } = this.props.navigation.state.params;
    const resetActions = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'home'}),
        NavigationActions.navigate({
          routeName: 'deckHome',
          params: {
            title,
            id,
          },
        }),
      ],
    });
    this.props.navigation.dispatch(resetActions);
  };

  showResults = () => {
    clearLocalNotification().then(setLocalNotification);
    const { currentCard, numberOfCards, correct } = this.state;
    var height = Dimensions.get('window').height - 200;
    var percentage = Math.round(correct / numberOfCards * 100);
    return (
      <View>
        <Card title="You are done!" wrapperStyle={{ height: height + 80 }}>
          <Text style={{ textAlign: 'center' }}>You answered {percentage}% correct!</Text>
          <View style={{ marginTop: height - 100 }}>
            <Button
              onPress={this.startOver}
              backgroundColor="#FFFFFF"
              title="Start Over"
              color="#3066be"
              fontSize={16}
            />
            <Button
              onPress={this.differentDeck}
              backgroundColor="#FFFFFF"
              title="Deck Home"
              color="#3066be"
              fontSize={16}
            />
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const { currentCard, numberOfCards, correct, viewAnswer } = this.state;
    var height = Dimensions.get('window').height - 200;
    return (
      <View>
        {currentCard <= numberOfCards ? (
          <View>
            <Text style={styles.counter}>
              {currentCard}/{numberOfCards}
            </Text>
            <Card wrapperStyle={{ height }} title={this.props.questions[currentCard - 1].question}>
              <View>
                {viewAnswer ? (
                  <Text
                    style={{
                      marginTop: 14,
                      marginBottom: 10,
                      textAlign: 'center',
                      fontSize: 16,
                      color: '#3066be',
                    }}>
                    {this.props.questions[currentCard - 1].answer}
                  </Text>
                ) : (
                  <Button
                    backgroundColor="#FFFFFF"
                    title="View answer"
                    color="#3066be"
                    fontSize={16}
                    onPress={this.toggleAnswer}
                  />
                )}
                <View style={{ marginTop: height - 260 }}>
                  <Button
                    onPress={this.handleCorrect}
                    backgroundColor="#388E3C"
                    buttonStyle={{ marginBottom: 10, height: 65 }}
                    title="Correct"
                  />
                  <Button
                    onPress={this.handleIncorrect}
                    backgroundColor="#D32F2F"
                    buttonStyle={{ height: 65 }}
                    title="Incorrect"
                  />
                </View>
              </View>
            </Card>
          </View>
        ) : (
          this.showResults()
        )}
      </View>
    );
  }
}

function mapStatetoProps({ decks }, { navigation }) {
  return {
    questions: decks[navigation.state.params.id].questions,
  };
}

export default connect(mapStatetoProps)(QuizScreen);

const styles = StyleSheet.create({
  counter: {
    marginLeft: 16,
    marginTop: 16,
    fontSize: 20,
  },
});
