import React, {Component} from 'react'
import {Text, View, TouchableOpacity, TextInput, Dimensions, Alert} from 'react-native'
import {addCard} from '../actions/decks.js'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {addCardToDeck} from '../utils/api.js'
class CreateCard extends Component {

	state = {
		question: "",
		answer: "",
	}

	back = () => {
		this.props.navigation.dispatch(NavigationActions.back({
			key: this.props.navigation.key
		}))
	}

	addCard = () => {

		if (this.state.question === "" || this.state.answer === "" ) {
			Alert.alert(
			  'Alert Title',
			  'You did not give input for either question or answer',
			  [
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		} else {
			card = {
				question: this.state.question,
				answer: this.state.answer,
			}

			addCardToDeck(this.props.currentDeck, card)

			this.props.dispatch(addCard(this.props.currentDeck, card))
			this.back()
		}
	}

	render() {
		var {height, width} = Dimensions.get('window');
		width = width * 0.8
		return (
				<View style={{flex:1, justifyContent:"center", alignItems:"center"}}>

					<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, width:width}} 
					onChangeText={(question) => this.setState({question})}
        			value={this.state.question}
        			placeholder="Question"
        			/>
        			<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, width:width}} 
        			onChangeText={(answer) => this.setState({answer})}
        			value={this.state.answer}
        			placeholder="Answer"
        			/>
        			<TouchableOpacity onPress={this.addCard}>
        				<Text style={{fontSize:30}}>Submit</Text>
        			</TouchableOpacity>
				</View>
			)
	}

} 
function mapStateToProps({currentDeck, decks}) {
	return {
		currentDeck,
		decks,
	}
}
export default connect(mapStateToProps)(CreateCard)