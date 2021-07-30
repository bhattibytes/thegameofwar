import React  from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css'

const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function freshDeck () {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return <Card suit={suit} value={value}/>
    })
  })
}


class Deck extends React.Component {
  constructor(cards = freshDeck()){
    super();
    this.cards = cards
    this.shuffleDeck = this.shuffleDeck.bind(this);
  }

  shuffleDeck (deck = this.cards) {
    var randomIndx;
    var save;

    for (var i = 0; i < deck.length; i++) {
    randomIndx = Math.floor(Math.random() * deck.length);
      if (i = randomIndx) {
        randomIndx = Math.floor(Math.random() * deck.length)
      }
      save = deck[i];
      deck[i] = deck[randomIndx];
      deck[randomIndx] = save;
    }
    return deck;
  }

  render () {
    var newDeck = new Deck
    let newPlayer = newDeck.cards.slice(0, 26);
    let newComputer = newDeck.cards.slice(26);
    this.shuffleDeck(newPlayer);
    this.shuffleDeck(newComputer);

    return (
      <div className={styles.cardGame}>
        <div className={styles.deck}>
          {newPlayer}
        </div>
        <div className={styles.text}>draw</div>
        <div className={styles.deck}>
          {newComputer}
        </div>
      </div>
    )
  }
}  

export default Deck;
