export const RECIEVE_ALL_DECKS = "RECIEVE_ALL_DECKS"
export const CREATE_NEW_DECK = "CREATE_NEW_DECK"
export const ADD_CARD = "ADD_CARD"

export function recieveAllDecks(decks) {
	return {
		type: RECIEVE_ALL_DECKS,
		decks,
	}
}

export function createNewDeck(title) {
	return {
		type: CREATE_NEW_DECK,
		deck: {
			title,
			["questions"]: [],
		}
	}
}

export function addCard(title, card) {
	return {
		type:ADD_CARD,
		title,
		card,
	}
}