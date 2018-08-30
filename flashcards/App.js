import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';

import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import DeckHomeScreen from './src/screens/DeckHomeScreen';
import AddDeckScreen from './src/screens/AddDeckScreen';
import QuizScreen from './src/screens/QuizScreen.js';
import AddQuestionScreen from './src/screens/AddQuestionScreen.js';
import Logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(Logger), autoRehydrate()));

persistStore(store, {
  storage: AsyncStorage,
  whitelist: ['decks', 'quiz'],
});

export default class Home extends React.Component {

  render() {
    const MainNavigator = StackNavigator({
      home: { screen: HomeScreen },
      addDeck: { screen: AddDeckScreen },
      deckHome: { screen: DeckHomeScreen },
      quiz: { screen: QuizScreen },
      addQuestion: { screen: AddQuestionScreen },
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
