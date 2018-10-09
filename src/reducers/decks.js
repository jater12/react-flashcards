import {RECIEVE_ALL_DECKS, CREATE_NEW_DECK, ADD_CARD} from '../actions/decks.js';

export default function decks(state=null, action) {
	switch(action.type) {
		case RECIEVE_ALL_DECKS:
			return {
				...action.decks
			}
		case CREATE_NEW_DECK:
			return {
				...state,
				[action.deck.title]: action.deck
			}
		case ADD_CARD:

			deck = state[action.title]
			questions = deck['questions']
			newQuestions = questions.concat(action.card)
			newDeck = {
				...deck,
				['questions']: newQuestions
			}
			return {
				...state,
				[action.title]:newDeck
			}
		default:
			return state
	}
}