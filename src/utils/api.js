import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'
const DECK_STORAGE_KEY = "UdaciFlashCard:deck"
const NOTIFICATION_KEY = "UdaciFlashCard:notification"

export function getDecks() {

	return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function getDeck(id) {
	
	const deck =  getDecks().then((results) => {
		const data = JSON.parse(results)
		return data[id]
	})
	return deck

}

export function saveDeckTitle(title) {
	AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[title]:{
			title: title,
			questions: [],
		}
	}))
}

export function addCardToDeck(title, card) {

	AsyncStorage.getItem(DECK_STORAGE_KEY)
	.then((results) => {
		const data = JSON.parse(results)
		deck = data[title]
		questions = deck["questions"]
		newQuestions = questions.concat(card)
		newDeck = {
			...deck,
			["questions"]: newQuestions
		}
		AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
			...data,
			[title]: newDeck
		}))
	})

}

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
	.then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
	return {
		title: 'Test your self',
		body: 'Dont forget to test yourself today',
		ios: {
			sound: true,
		}
	}
}

export function setLocalNotification() {

	AsyncStorage.getItem(NOTIFICATION_KEY)
	.then(JSON.parse)
	.then((data) => {
		if (data === null) {
			Permissions.askAsync(Permissions.NOTIFICATIONS)
			.then(({status}) => {
				if (status === 'granted') {
					Notifications.cancelAllScheduledNotificationsAsync()
					let tomorrow = new Date()
					tomorrow.setDate(tomorrow.getDate() + 1)
					tomorrow.setHours(20)
					tomorrow.setMinutes(0)

					Notifications.scheduleLocalNotificationsAsync(
						createNotification(), 
						{
							time:tomorrow,
							repeat: 'day'
						})

					AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
				}

			})
		}
	})

}





