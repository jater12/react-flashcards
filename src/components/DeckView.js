import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {getDeck} from '../utils/api.js';
import {connect} from 'react-redux';

class DeckView extends Component {

	createCard = () => {
		this.props.navigation.navigate('CreateCard')
	}

	startQuiz = () => {
		this.props.navigation.navigate('Quiz')
	}

	render() {
		return (
				<View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
					<Text style={{fontSize:40, alignItems:"center", justifyContent:"center"}}>{this.props.deck.title}</Text>
					<Text style={{fontSize:20}}>{this.props.deck.questions.length + " cards"} </Text>
					<TouchableOpacity onPress = {this.createCard}>
						<Text>Add card</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress = {this.startQuiz}>
						<Text>Start Quiz</Text>
					</TouchableOpacity>
				</View>
			)
	}
}

function mapStateToProps({currentDeck, decks}) {

	return {
		deck: decks[currentDeck]
	}

}

export default connect(mapStateToProps)(DeckView)