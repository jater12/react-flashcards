import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import {saveDeckTitle, getDecks, clearDb} from '../utils/api.js';
import {createNewDeck} from '../actions/decks.js'
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {setCurrentDeck} from '../actions/deck.js';

class CreateDeck extends Component {
	
	state = {
		title:null,
	}

	toDeck = () => {
		this.props.navigation.navigate('DeckView')
	}

	createNewDeck = () => {
		title = this.state.title
		if (title != null){
			saveDeckTitle(this.state.title)
			this.props.dispatch(createNewDeck(title))
		}
		this.setState(()=>({title:null}))
		this.props.dispatch(setCurrentDeck(title))
		this.toDeck()
	}

	

	render() {
		var {height, width} = Dimensions.get('window');
		width = width*0.8
		return (
				<View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
					<Text style={{flexWrap:'wrap', fontSize:40, textAlign:"center"}}> What is the title of your new deck?</Text>
					<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, width:width}} onChangeText={(title) => this.setState({title})}
        value={this.state.title}/>
					<TouchableOpacity onPress={this.createNewDeck}>
						<Text style={{fontSize:20}}>Submit</Text>
					</TouchableOpacity>
				</View>
			)
	}
}

export default connect()(CreateDeck)