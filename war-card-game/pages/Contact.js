import React from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import linkedin from '../public/linkedin.jpeg';
import github from '../public/github.png';
import JB_profile from '../public/JB_profile.jpeg';

const Contact = () => {
  return (
    <div className={styles.contact}>
      <h1 className={styles.contact_heading}>Meet the Developers</h1>
      <p>Jason Bhatti</p>
      <Image className={styles.profile} src={JB_profile} height={75} width={75} />
      <a href="https://www.linkedin.com/in/jasonbhatti/"><Image src={linkedin} alt="LinkedIn logo" width="130" height="75"/></a>
      <a href="https://github.com/bhattibytes"><Image src={github} alt="Github logo" width={120} height={70} /></a>

      <footer className={styles.footer}>
      <a href="/Game">Back to Game</a>
      <a href="/Rules">See Rules</a>
      </footer>
    </div>
  )
}   


export default Contact;

