import React, {Component} from 'React';
import {Platform, View, Text} from 'react-native';
import {
  Button,
  FormValidationMessage,
  FormLabel,
  FormInput,
} from 'react-native-elements';

import UUID from 'uuid';
import {NavigationActions} from 'react-navigation';

import {addDeck} from '../actions/decks';
import {connect} from 'react-redux';

class AddDeckScreen extends Component {
  state = {
    title: '',
    error: false,
  };

  onChangeText = title => {
    this.setState({title});
    if (title.length === 1) {
      this.setState({error: false});
    }
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: 'ADD NEW DECK',
      headerStyle: {
        backgroundColor: '#3066be',
        marginTop: Platform.OS === 'android' ? 24 : 0,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitleStyle: {color: 'white'},
      headerTintColor: 'white',
    };
  };

  handlePress = () => {
		const id = UUID();
    const {title} = this.state;
    const {addDeck} = this.props;
    if (title === '') {
      return this.setState({error: true});
    }
    this.input.clearText();

    addDeck(title,id);

    const resetActions = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'home'}),
        NavigationActions.navigate({
          routeName: 'deckHome',
          params: {title, id},
        }),
      ],
    });
    this.props.navigation.dispatch(resetActions);
  };

  render() {
    return (
      <View>
        <FormLabel>Deck Title</FormLabel>
        <FormInput
          ref={input => (this.input = input)}
          onChangeText={this.onChangeText}
        />
        {this.state.error ? (
          <FormValidationMessage containerStyle={{height: 30}}>
            Deck title is required
          </FormValidationMessage>
        ) : (
          <FormValidationMessage containerStyle={{height: 30}} />
        )}
        <Button
          backgroundColor="#3066be"
          color="white"
          onPress={this.handlePress}
          title="Create"
        />
      </View>
    );
  }
}

export default connect(null, {addDeck})(AddDeckScreen);
