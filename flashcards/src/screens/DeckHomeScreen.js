import React, {Component} from 'React';
import {StyleSheet, Platform, View, Text, LayoutAnimation} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import _ from 'lodash';
import {NavigationActions} from 'react-navigation';

class DeckHomeScreen extends Component {
  componentDidMount() {
    LayoutAnimation.spring();
  }

  state = {
    numberOfCards: this.props.deck.questions.length,
  };

  static navigationOptions = ({navigation}) => {
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

  addQuestions = deck => {
    const DeckTitle = this.props.navigation.state.params.title;
    const resetActions = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'home'}),
        NavigationActions.navigate({
          routeName: 'addQuestion',
          params: {id: deck.id, title: DeckTitle},
        }),
      ],
    });
    this.props.navigation.dispatch(resetActions);
  };

  startChallenge = deck => {
    const DeckTitle = this.props.navigation.state.params.title;
    const resetActions = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'home'}),
        NavigationActions.navigate({
          routeName: 'quiz',
          params: {id: deck.id, title: DeckTitle},
        }),
      ],
    });
    this.props.navigation.dispatch(resetActions);
  };

  render() {
    const DeckTitle = this.props.navigation.state.params.title;
    const {numberOfCards} = this.state;
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.TitleStyle}>{`${DeckTitle} Deck`}</Text>
        {!this.props.deck.questions.length ? (
          <View>
            <Icon
              reverse
              name="frown-o"
              type="font-awesome"
              color="#636060"
              reverse={false}
              size={70}
            />
            <Text style={styles.NoCards}>This deck has no cards :(</Text>
            <Button
              backgroundColor="#f39237"
              title="ADD SOME CARDS"
              onPress={() => this.addQuestions(this.props.deck)}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.numberOfCards}>
              {' '}
              {numberOfCards}
              {numberOfCards === 1 ? ' Card' : ' Cards'}{' '}
            </Text>
            <Button
              backgroundColor="#E9E9EF"
              title="Add more?"
              color="#3066be"
              fontSize={16}
              buttonStyle={{paddingBottom: 40}}
              onPress={() => this.addQuestions(this.props.deck)}
            />
            <Button
              backgroundColor="#3066be"
              title="START CHALLENGE"
              onPress={() => this.startChallenge(this.props.deck)}
            />
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps({decks}, {navigation}) {
  return {
    deck: decks[navigation.state.params.id],
  };
}

export default connect(mapStateToProps)(DeckHomeScreen);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  TitleStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: '#636060',
    margin: 20,
  },
  NoCards: {
    margin: 20,
    textAlign: 'center',
    color: '#636060',
  },
  numberOfCards: {
    color: '#636060',
    fontSize: 20,
    textAlign: 'center',
  },
});
