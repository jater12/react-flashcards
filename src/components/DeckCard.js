import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import {setCurrentDeck} from '../actions/deck.js';

class DeckCard extends Component{

	
	onPress = () => {
		this.props.dispatch(setCurrentDeck(this.props.title))
		this.props.navigation.navigate('DeckView')
	}
	render() {
		return (
			<TouchableOpacity onPress={this.onPress}>
				<View style={{flex:1}}>
					<View style={{flex:1, borderRadius:4, borderWidth:0.5, justifyContent:'center', alignItems:'center', padding:25}}>
						<Text style={{justifyContent:'center', alignItems:'center', fontSize:30}}>{this.props.title}</Text>
						<Text style={{justifyContent:'center', alignItems:'center', fontSize:20}}>{this.props.questions.length + " cards"}</Text>
					</View>
				</View>
			</TouchableOpacity>
			)
	}
}

export default connect()(DeckCard)