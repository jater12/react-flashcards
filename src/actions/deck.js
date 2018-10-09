export const SET_CURRENT_DECK = "SET_CURRENT_DECK"


export function setCurrentDeck(currentDeck) {
	return {
		type:SET_CURRENT_DECK,
		currentDeck,
	}
}

