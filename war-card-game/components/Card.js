import React  from 'react';
import styles from '../styles/Home.module.css';

class Card extends React.Component {
  constructor(props){
    super(props);
    this.suit = this.props.suit;
    this.value = this.props.value;
  }

  render (props) {
    return (
      <div className={styles.card}>
        <h1>{this.props.suit}</h1>
        <h2>{this.props.value}</h2>
      </div>
    )
  }
}

export default Card;