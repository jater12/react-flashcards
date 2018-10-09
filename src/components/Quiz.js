import React, {Component} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {AppLoading} from 'expo';
import {NavigationActions} from 'react-navigation';
import {clearLocalNotification, setLocalNotification} from '../utils/api.js'

class Quiz extends Component {

	state = {
		currentQuestion: 0,
		correctAnswers: 0,
		showOption: "Answer"
	}

	//Shuffling code taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	shuffle = (array) => {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}


	flipCard = () => {
		if (this.state.showOption === "Answer") {
			this.setState({
				showOption: "Question"
			})
		} else {
			this.setState({
				showOption: "Answer"
			})
		}
	}

	nextQuestion = () => {
		if (this.state.currentQuestion === this.state.numQuestions) {
			//If test is completed then we clear the localNotification for today and set one for tomorrow
			clearLocalNotification.then(setLocalNotification)
		}
		currentQuestion = this.state.currentQuestion + 1
		this.setState(() =>({
			currentQuestion: currentQuestion,
		}))


	}

	answerCorrect = () => {
		actualAnswer = this.state.answers[this.state.currentQuestion]
		expectedAnswer = this.state.questions[this.state.currentQuestion]["answer"]
		if (actualAnswer === expectedAnswer){
			correctAnswers = this.state.correctAnswers + 1
			this.setState(() => ({
				correctAnswers: correctAnswers
			}))
		}
		this.nextQuestion()
	}

	answerIncorrect = () => {
		actualAnswer = this.state.answers[this.state.currentQuestion]
		expectedAnswer = this.state.questions[this.state.currentQuestion]["answer"]
		if (actualAnswer != expectedAnswer){
			correctAnswers = this.state.correctAnswers + 1
			this.setState(()=>({
				correctAnswers: correctAnswers
			}))
		}
		this.nextQuestion()
	}

	resetQuiz = () => {
		var answers = this.shuffle(this.state.answers)
		this.setState(() => ({
			currentQuestion: 0,
			correctAnswers: 0,
			showOption: "Answer",
		}))
	}

	toDeck = () => {
		this.props.navigation.dispatch(NavigationActions.back({
			key: this.props.navigation.key
		}))
	}

	componentDidMount() {
		var deck = this.props.decks[this.props.currentDeck]
		var numQuestions = deck["questions"].length
		var questions = deck["questions"]
		var answers = this.shuffle(questions.map((question) => (question["answer"])))
		this.setState(() =>({
			numQuestions: numQuestions,
			questions: questions,
			answers: answers,
		}))
	}
		

	render() {
		currentQuestion = this.state.currentQuestion
		correctAnswers = this.state.correctAnswers
		if (this.state.numQuestions === 0 ){
			return (
					<View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
						<Text style={{fontSize:30}}>No Cards in this Deck</Text>
					</View>	
				)

		} else if (currentQuestion != this.state.numQuestions) {
			return (
					<View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
						<Text style={{flex:1}}>{currentQuestion + " / " + this.state.numQuestions}</Text>
						{this.state.showOption === "Answer" && this.state.numQuestions != null && <Text style={{flex:4, fontSize:40}}>{this.state.questions[currentQuestion]["question"]}</Text>}
						{this.state.showOption === "Question" && this.state.numQuestions != null && <Text style={{flex:4, fontSize:40}}>{this.state.answers[currentQuestion]}</Text>}
						<TouchableOpacity style={{flex:4}} onPress={this.flipCard}>
							<Text style={{flex:4, fontSize:20}}>{this.state.showOption}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flex:2}} onPress={this.answerCorrect}>
							<Text style={{flex:2, fontSize:30}}>Correct</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flex:2}} onPress={this.answerIncorrect}>
							<Text style={{flex:2, fontSize:30}}>Incorrect</Text>
						</TouchableOpacity>
					</View>
				)
		} else {
			return (
					<View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
						<Text style={{fontSize:40}}>Score: {this.state.correctAnswers + " / " + this.state.numQuestions}</Text>
						<TouchableOpacity onPress={this.resetQuiz}>
							<Text style={{fontSize:20}}> Reset Quiz </Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.toDeck}>
							<Text style={{fontSize:20}}> Back to Deck </Text>
						</TouchableOpacity>
					</View>	
				)
		}
		
	}
}

function mapStateToProps({currentDeck, decks}) {
	return {
		currentDeck,
		decks,
	}
}

export default connect(mapStateToProps)(Quiz)