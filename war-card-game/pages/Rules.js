import React from 'react';
import styles from '../styles/Home.module.css';

const Rules = () => {
  return (
    <div className={styles.rules_container}>
      <h1 className={styles.rules_heading}>Rules of the Game</h1>
      <h4 className={styles.rules_title}>THE DEAL</h4>
        <p className={styles.rules_details}>The deck is shuffled and divided evenly with each player receiving 26 cards. Each player places their stack of cards face down, in front of them.</p>
      <h4 className={styles.rules_title}>THE PLAY</h4>
        <p className={styles.rules_details}>Each player turns up a card at the same time and the player with the higher card takes both cards and puts them face down on the bottom of their stack and both decks are reshuffled to add a higher complexity of randomness.
        </p>
        <p className={styles.rules_details}>If the cards are the same rank, it is WarTime. Each player places three cards face down and one card face up as the attack card. The player with the higher attack card wins both piles. If however the attack card is again the same rank, the process repeats itself until there is a clear winner.</p>
      <h4 className={styles.rules_title}>HOW TO KEEP SCORE</h4>
        <p className={styles.rules_details}>The game ends when one player has won all the cards.</p>

      <footer className={styles.footer}>
        <a href="/Game">Back to Game</a>
        <a href="/Contact">Meet the Developers</a>
      </footer>
    </div>
  )
}


export default Rules;

