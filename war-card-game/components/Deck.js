import React, { Component }  from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';

const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

let inRound, stop

function freshDeck () {
  return SUITS.flatMap(suit => {
    return VALUES.map((value) => {
      return <Card suit={suit} value={value}/>
    })
  })
}

class Deck extends React.Component {
  constructor(cards = freshDeck()){
    super();
    this.cards = cards
    this.shuffleDeck = this.shuffleDeck.bind(this);
    this.playGame = this.playGame.bind(this);
    this.cleanBeforeRound = this.cleanBeforeRound.bind(this);
    this.flipCards = this.flipCards.bind(this);
    this.updateDeckCount = this.updateDeckCount.bind(this);
    this.isRoundWinner = this.isRoundWinner.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
    this.state = {
      playerDeck: [],
      computerDeck: [],
      computerCardSlot: <div></div>,
      playerCardSlot: <div></div>,
      computerDeckElement: <div></div>,
      playerDeckElement: <div></div>,
      text: <div></div>,
      play: '',
      deck: <div></div>
    }
  }

  componentDidMount() {
    var newDeck = new Deck
    let newPlayer = newDeck.cards.slice(0, 26);
    let newComputer = newDeck.cards.slice(26);
    this.shuffleDeck(newPlayer);
    this.shuffleDeck(newComputer);
    this.setState({
      computerCardSlot: document.querySelector(".computer-card-slot"),
      playerCardSlot: document.querySelector(".player-card-slot"),
      computerDeckElement: document.querySelector(".computerDeck"),
      playerDeckElement: document.querySelector(".playerDeck"),
      text: document.querySelector(".text"),
      playerDeck: newPlayer,
      computerDeck: newComputer,
      deck: newDeck
    })
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

  playGame(e) {
    e.preventDefault();
    if (stop) {
      this.startGame();
      return
    }

    if (inRound) {
      this.cleanBeforeRound()
    } else {
      this.flipCards()
    }
  }

  startGame () {
    inRound = false
    stop = false
  
    this.cleanBeforeRound()
  }

  cleanBeforeRound() {
    inRound = false

    this.setState({
      computerCardSlot: "",
      playerCardSlot: "",
      text: ""
    })
  
    this.updateDeckCount() 
  }

  async flipCards() {
    inRound = true
  
    var playerCard = this.state.playerDeck[this.state.playerDeck.length - 1];
    var computerCard = this.state.computerDeck[this.state.computerDeck.length - 1];
    
    var updatePlayerDeck = this.state.playerDeck.slice(0, -1);
    var updateComputerDeck = this.state.computerDeck.slice(0, -1);

    await this.setState({
      playerDeck: this.shuffleDeck(updatePlayerDeck),
      computerDeck: this.shuffleDeck(updateComputerDeck)
    }, () => this.render());
    
    var wonDeck = [];
    var player = [];
    var computer = [];

    this.updateDeckCount()
  
    if (this.isRoundWinner(playerCard, computerCard)) {
      wonDeck.push(playerCard, computerCard);
      await this.setState({
        play: "Win",
        playerDeck: this.shuffleDeck(this.state.playerDeck.concat(wonDeck))
      }, () => this.render())
    } else if (this.isRoundWinner(computerCard, playerCard)) {
      wonDeck.push(playerCard, computerCard);
      await this.setState({
        play: "Loose",
        computerDeck: this.shuffleDeck(this.state.computerDeck.concat(wonDeck))
      }, () => this.render())
    } else { 
      player.push(playerCard);
      computer.push(computerCard);
      await this.setState({
        play: "Draw",
        playerDeck: this.shuffleDeck(this.state.playerDeck.concat(player)),
        computerDeck: this.shuffleDeck(this.state.computerDeck.concat(computer))
      }, () => this.render());
    }
  
    if (this.isGameOver(this.state.playerDeck)) {
      this.setState({
        text: "You Lose!!"
      })
      stop = true
    } else if (this.isGameOver(this.state.computerDeck)) {
      this.setState({
        text: "You Win!!"
      })
      stop = true
    }
  }

  updateDeckCount() {
    this.setState({
      computerDeckElement: this.state.computerDeck.numberOfCards,
      playerDeckElement: this.state.playerDeck.numberOfCards
    })
  }

  isRoundWinner(cardOne, cardTwo) {
    console.log('Here is card ONE--->', cardOne.props, 'Here is card TWO--->', cardTwo.props)
    return CARD_VALUE_MAP[cardOne.props.value] > CARD_VALUE_MAP[cardTwo.props.value]
  }

  isGameOver(deck) {
    return deck.numberOfCards === 0
  }

  render () {
    return (
      <div className={styles.cardGame}>
        <div className={styles.playerDeck, styles.deck}>
          {this.state.playerDeck}
        </div>
        <div className="player-card-slot card-slot"></div>
        <div className={styles.text}> {this.state.play} <button onClick={this.playGame}>PLAY</button></div>
        <div className={styles.computerDeck, styles.deck}>
          {this.state.computerDeck}
        </div>
        <div className="computer-card-slot card-slot"></div>
      </div>
    )
  }
}  

export default Deck;
