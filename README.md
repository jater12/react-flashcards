# FlashCards Project

## Description
This is a simple native react app simulates flashcards. The user can create flashcards, group flashcards into decks, and test themselves using the flashcards. The data is managed and stored in AsyncStorage. Consistency of the data across various components is manged by Redux. This project was tested using ios 10.3 on Expo

## File Structure
Components<br/>
App.js - root of the app <br/>
CreateCard.js - Page for creating cards that are to be added to the deck <br/>
CreateDeck.js - Page for creating a new empty deck <br/>
DeckCard.js - The component used to render the various decks in the ```DeckList``` Component <br/>
DeckList.js - Displays all the decks via ```FlatList``` to allow for infinite performant scrolling <br/>
DeckView.js - Component for the individual deck views <br/>
Quiz.js - Component for the quiz <br/>
<br/>
Actions<br/>
deck.js - create the action to set the currentDeck <br/>
decks.js - creates the action for receiving and generating new decks and cards <br/>
<br/>
MiddleWare<br/>
index - applies the middleware to the redux store
logger - general logger middleware for debugging purposes
<br/>
Reducers<br/>
deck.js - reducer for setting the currentDeck<br/>
decks.js - reducer for setting the decks and the cards<br/>
index - applies the reducers as well as loading bar to the redux store


## Installation
run ```npm install``` <br/>
run ```expo start```
press ```i``` in the terminal to launch the simulator for ios