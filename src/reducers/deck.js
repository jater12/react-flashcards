import {SET_CURRENT_DECK} from '../actions/deck.js';

export default function handleSetCurrentDeck(state=null, action) {
	switch(action.type) {
		case SET_CURRENT_DECK:
			return action.currentDeck
		default:
			return state
	}
}	