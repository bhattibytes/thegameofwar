import React from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import linkedin from '../public/linkedin.jpeg';
import github from '../public/github.png';
import JB_profile from '../public/JB_profile.jpeg';
import PJ_profile from '../public/pam.jpeg';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className={styles.contact}>
      <NavBar />
      <h1 className={styles.contact_heading}>Meet the Developers</h1>
      <div className={styles.contact_container}>
        <div className={styles.jason}>
          <p>Jason Bhatti</p>
          <Image className={styles.JB_profile} src={JB_profile} height={75} width={75} />
          <a href="https://www.linkedin.com/in/jasonbhatti/"><Image className={styles.linkedin} src={linkedin} alt="LinkedIn logo" width="130" height="75"/></a>
          <a href="https://github.com/bhattibytes"><Image src={github} alt="Github logo" width={120} height={70} /></a>
        </div>
        <div className={styles.pam}>
        <p>Pamela Jung</p>
          <Image className={styles.PJ_profile} src={PJ_profile} height={75} width={75} />
          <a href="https://www.linkedin.com/in/pamelajung/"><Image className={styles.linkedin} src={linkedin} alt="LinkedIn logo" width="130" height="75"/></a>
          <a href="https://github.com/pamify"><Image src={github} alt="Github logo" width={120} height={70} /></a>
        </div>
      </div>
      <Footer />
    </div>
  )
}   


export default Contact;