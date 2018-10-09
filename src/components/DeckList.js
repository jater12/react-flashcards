import React, {Component} from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import {getDecks} from '../utils/api.js';
import {AppLoading} from 'expo';
import {setCurrentDeck} from '../actions/deck.js';
import {recieveAllDecks} from '../actions/decks.js';
import {connect} from 'react-redux';
import DeckCard from './DeckCard.js';
import CreateCard from './CreateCard.js';

var sampleData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

class DeckList extends Component {

	componentDidMount() {
		this.props.dispatch(setCurrentDeck(null))
		getDecks().then((result) => {
			this.props.dispatch(recieveAllDecks(JSON.parse(result)))
		})
	}

	renderDeck = ({item}, navigation) => {
		return <DeckCard {...item} navigation={navigation}/>
	}

	render() {

		if (this.props.decks != null) {
			return (
					<View style={{flex:1, flexDirection:"row"}}>
						<FlatList style={{flex:1}} 
						data={Object.values(this.props.decks)} 
						renderItem={item => this.renderDeck(item, this.props.navigation)}
						keyExtractor={(item) => item.title} 
						removeClippedSubviews={false}/>
					</View>
				)
		} else {
			return <AppLoading />
		}
	}

}

function mapStateToProps({currentDeck, decks}) {
	return {
		currentDeck,
		decks
	}
}

export default connect(mapStateToProps)(DeckList);