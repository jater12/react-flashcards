import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {Constants} from 'expo';
import DeckList from './src/components/DeckList.js';
import CreateDeck from './src/components/CreateDeck.js';
import DeckView from './src/components/DeckView.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import middleware from './src/middleware';
import CreateCard from './src/components/CreateCard.js';
import Quiz from './src/components/Quiz.js';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {setLocalNotification} from './src/utils/api.js'
function FlashCardStatusBar(){
  return (
      <View style={{height:Constants.statusBarHeight}}/>
    )
}

const store = createStore(reducers, middleware) 

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: DeckList
  },
  CreateDeck: {
    screen: CreateDeck
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
  },
  DeckView: {
    screen: DeckView,
  },
  CreateCard: {
    screen: CreateCard,
  },
  Quiz: {
    screen: Quiz,
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
          <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
