import React, { Component }  from 'react';
import Card from '../components/Card';
import styles from '../styles/Home.module.css';
import Confetti from 'react-confetti'

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
};
let playerWarArr = [];
let computerWarArr = [];

let inRound, stop;

function freshDeck () {
  return SUITS.flatMap(suit => {
    return VALUES.map((value) => {
      return <Card suit={suit} value={value} key={Math.random()}/>
    });
  });
}

class Game extends React.Component {
  constructor(cards = freshDeck()){
    super();
    this.cards = cards
    this.shuffleDeck = this.shuffleDeck.bind(this);
    this.playGame = this.playGame.bind(this);
    this.cleanBeforeRound = this.cleanBeforeRound.bind(this);
    this.flipCards = this.flipCards.bind(this);
    this.isRoundWinner = this.isRoundWinner.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
    this.startGame = this.startGame.bind(this);
    this.state = {
      play: 'Start New Game',
      warTime: false,
      playerDeck: [],
      playerWar: [],
      savePlayerCard: {},
      computerDeck: [],
      computerWar: [],
      saveComputerCard: {},
      playerCardSlot: <div></div>,
      playerWarDeckSlot: <div></div>,
      computerCardSlot: <div></div>,
      computerWarDeckSlot: <div></div>,
      text: <div></div>,
      deck: <div></div>,
      winCondition: <div></div>
    }
  }

  componentDidMount() {
    let newDeck = new Game;
    this.shuffleDeck(newDeck);
    let newPlayer = newDeck.cards.slice(0, 26);
    this.shuffleDeck(newPlayer);
    let newComputer = newDeck.cards.slice(26);
    this.shuffleDeck(newComputer);
    this.setState({
      cardGameElement: document.querySelector(".cardGame"),
      computerCardSlot: document.querySelector(".computer_card_slot"),
      playerCardSlot: document.querySelector(".player_card_slot"),
      text: document.querySelector(".text"),
      deck: document.querySelector(".deck"),
      playerDeck: newPlayer,
      computerDeck: newComputer
    })
  }

  shuffleDeck (deck = this.cards) {
    let randomIndx;
    let save;

    for (let i = 0; i < deck.length; i++) {
    randomIndx = Math.floor(Math.random() * deck.length);
      if (i = randomIndx) {
        randomIndx = Math.floor(Math.random() * deck.length);
      }
      save = deck[i];
      deck[i] = deck[randomIndx];
      deck[randomIndx] = save;
    }
    return deck;
  }

  playGame(e) {
    if (this.isGameOver(this.state.playerDeck)) {
      this.setState({
        text: "You Lose!!",
      })
      stop = true;
    } else if (this.isGameOver(this.state.computerDeck)) {
      this.setState({
        text: "You Win!!",
        winCondition: <Confetti width={"500px"} height={"1000px"} recycle={false}/>
      })
      stop = true;
    }
    if (stop) {
      this.startGame();
    }

    if (inRound) {
      this.cleanBeforeRound();
    } else {
      this.flipCards();
    }
  }

  async startGame () {
    await this.setState({
      play: 'Start New Game'
    })
    let newDeck = new Deck;
    this.shuffleDeck(newDeck);
    let newPlayer = newDeck.cards.slice(0, 26);
    this.shuffleDeck(newPlayer);
    let newComputer = newDeck.cards.slice(26);
    this.shuffleDeck(newComputer);
    this.setState({
      cardGameElement: document.querySelector(".cardGame"),
      computerCardSlot: document.querySelector(".computer_card_slot"),
      playerCardSlot: document.querySelector(".player_card_slot"),
      text: document.querySelector(".text"),
      deck: document.querySelector(".deck"),
      playerDeck: newPlayer,
      computerDeck: newComputer
    })
    inRound = false;
    stop = false;
  
    this.cleanBeforeRound();
  }

  cleanBeforeRound() {
    inRound = false;

    this.setState({
      computerCardSlot: <div></div>,
      playerCardSlot: <div></div>,
      text: <div></div>
    })
  }

  async flipCards() {
    inRound = true;
  
    let playerCard = this.state.playerDeck[this.state.playerDeck.length - 1];
    let computerCard = this.state.computerDeck[this.state.computerDeck.length - 1];
  
    let updatePlayerDeck = this.state.playerDeck.slice(0, -1);
    let updateComputerDeck = this.state.computerDeck.slice(0, -1);
    if (playerCard && computerCard) {
      await this.setState({
        playerDeck: this.shuffleDeck(updatePlayerDeck),
        computerDeck: this.shuffleDeck(updateComputerDeck),
        playerCardSlot: <Card suit={playerCard.props.suit} value={playerCard.props.value} />,
        computerCardSlot: <Card suit={computerCard.props.suit} value={computerCard.props.value} />
      }, () => this.render());
    }
    
    let wonDeck = [];
  
    if (this.state.warTime) {
      playerWarArr.push(...this.state.playerDeck.slice(0, 3), this.state.savePlayerCard);
      computerWarArr.push(...this.state.computerDeck.slice(0, 3), this.state.saveComputerCard);
      
      await this.setState({
        playerDeck: this.state.playerDeck.slice(3),
        computerDeck: this.state.computerDeck.slice(3),
        playerWar: this.state.playerWar.concat(playerWarArr),
        computerWar: this.state.computerWar.concat(computerWarArr),
        savePlayerCard: {},
        saveComputerCard: {},
        warTime: !this.state.warTime
      }, () => this.render())

        playerWarArr = [];
        computerWarArr = [];

      if (this.isRoundWinner(playerCard, computerCard)) {
        await wonDeck.push(playerCard, computerCard, ...this.state.playerWar, ...this.state.computerWar);
        await this.setState({
          play: "PLAYER WINS WAR",
          playerDeck: this.shuffleDeck(this.state.playerDeck.concat(wonDeck)),
          playerWar: [],
          computerWar: []
        }, () => this.render());

      } else if (this.isRoundWinner(computerCard, playerCard)) {
        await wonDeck.push(playerCard, computerCard, ...this.state.playerWar, ...this.state.computerWar);
        await this.setState({
          play: "COMPUTER WINS WAR",
          computerDeck: this.shuffleDeck(this.state.computerDeck.concat(wonDeck)),
          playerWar: [],
          computerWar: []
        }, () => this.render())
      }
    } else if (this.isRoundWinner(playerCard, computerCard)) {
      await wonDeck.push(playerCard, computerCard);
      await this.setState({
        play: "Player Wins Round!",
        playerDeck: this.shuffleDeck(this.state.playerDeck.concat(wonDeck)),
        playerWarDeckSlot: <div></div>,
        computerWarDeckSlot: <div></div>
      }, () => this.render())

    } else if (this.isRoundWinner(computerCard, playerCard)) {
      await wonDeck.push(playerCard, computerCard);
      await this.setState({
        play: "Computer Wins Round!",
        computerDeck: this.shuffleDeck(this.state.computerDeck.concat(wonDeck)),
        playerWarDeckSlot: <div></div>,
        computerWarDeckSlot: <div></div>
      }, () => this.render())

    } else {
      this.setState({
        warTime: !this.state.warTime,
        savePlayerCard: playerCard,
        saveComputerCard: computerCard,
        playerWarDeckSlot: <Card suit={playerCard.props.suit} value={playerCard.props.value} />,
        computerWarDeckSlot: <Card suit={computerCard.props.suit} value={computerCard.props.value} />,
      }, () => this.render())
      return this.flipCards();
    }
  }

  isRoundWinner(cardOne, cardTwo) {
    if (cardOne && cardTwo) {
      return CARD_VALUE_MAP[cardOne.props.value] > CARD_VALUE_MAP[cardTwo.props.value];
    } else {
      this.setState({
        play: 'GAME OVER'
      })
      return 
    }
  }

  isGameOver(deck) {
    return deck.length === 0;
  }

  render () {
    return (
      <div className={styles.cardGame}>
        {this.state.winCondition}
        {/* Players Cards  */}
        <img className={styles.playerDeckCover} src="https://www.atomsindustries.com/assets/images/items/asd1736/black-ghost-back.png" />
        <div className={styles.playerDeckCount}>PlayerDeck Count:{this.state.playerDeck.length}</div>
        <div className={styles.playerDeck}>{this.state.playerDeck}</div>
        <div className={styles.player_card_slot}>{this.state.playerCardSlot}</div>

        {this.state.play === 'COMPUTER WINS WAR' || this.state.play === 'PLAYER WINS WAR' ? <div>
        <img className={styles.playerDeckCoverWar1} src="https://www.atomsindustries.com/assets/images/items/asd1736/black-ghost-back.png" />
        <img className={styles.playerDeckCoverWar2} src="https://www.atomsindustries.com/assets/images/items/asd1736/black-ghost-back.png" />
        <img className={styles.playerDeckCoverWar3} src="https://www.atomsindustries.com/assets/images/items/asd1736/black-ghost-back.png" />
        <div className={styles.playerWarSlot}>{this.state.playerWarDeckSlot}</div></div> : null }
        
        {/* Buttons and Pay Messages */}
        <div className={styles.text}> {this.state.play}</div>
        {this.state.play === 'GAME OVER' ? null : <button onClick={this.playGame}>PLAY</button>}<br></br>{this.state.play === 'GAME OVER' ? <button onClick={this.startGame}>RESET</button> : null }

        {/* TOTAL CARD COUNT */}
        {this.state.playerDeck.length + this.state.computerDeck.length}

        {/* Computer's Cards */}
        <img className={styles.computerDeckCover} src="https://www.atomsindustries.com/assets/images/items/asd1736/black-ghost-back.png" />
        <div className={styles.computerDeckCount}>ComputerDeck Count:{this.state.computerDeck.length}</div>
        <div className={styles.computerDeck}>{this.state.computerDeck}</div>
        <div className={styles.computer_card_slot}>{this.state.computerCardSlot}</div>
       
        {this.state.play === 'COMPUTER WINS WAR' || this.state.play === 'PLAYER WINS WAR' ? <div>
        <img className={styles.computerDeckCoverWar1} src="https://www.atomsindustries.com/assets/images/items/asd1736/black-ghost-back.png" />
        <img className={styles.computerDeckCoverWar2} src="https://www.atomsindustries.com/assets/images/items/asd1736/black-ghost-back.png" />
        <img className={styles.computerDeckCoverWar3} src="https://www.atomsindustries.com/assets/images/items/asd1736/black-ghost-back.png" />
        <div className={styles.computerWarSlot}>{this.state.computerWarDeckSlot}</div>
        </div> : null}

        <footer className={styles.footer}>
          <a href="/Rules">See Rules</a>
          <a href="/Contact">Meet the Developers</a>
        </footer>
      </div>
    )
  }
}  

export default Game;