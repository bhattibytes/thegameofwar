import React from 'react';
import styles from '../styles/Home.module.css';

const Instructions = () => {
  return (
    <div>
      <div className={styles.howToPlay}>
        <img className={styles.howToPlayImg} src="https://i.ytimg.com/vi/J5vT33Vo04s/maxresdefault.jpg" height="400px"/>
      </div>
      <h1>Instructions</h1>
      <h4 className={styles.instruction_title}>THE DEAL</h4>
        <p className={styles.instruction_details}>The deck is shuffled and divided evenly with each player receiving 26 cards. Each player places their stack of cards face down, in front of them.</p>
      <h4 className={styles.instruction_title}>THE PLAY</h4>
        <p className={styles.instruction_details}>Each player turns up a card at the same time and the player with the higher card takes both cards and puts them face down on the bottom of their stack.
        </p>
        <p className={styles.instruction_details}>If the cards are the same rank, it is War. Each player turns up three cards face down and one card face up. The player with the higher cards takes both piles. If the turned-up cards are again the same rank, each player places three additional cards face down and turns another card face up. The player with the higher card takes all the cards.</p>
      <h4 className={styles.instruction_title}>HOW TO KEEP SCORE</h4>
        <p className={styles.instruction_details}>The game ends when one player has won all the cards.</p>
    </div>
  )
}


export default Instructions;

