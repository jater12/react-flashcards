import { combineReducers } from 'redux'
import currentDeck from './deck.js'
import decks from './decks.js'

export default combineReducers({
	currentDeck,
	decks,
})