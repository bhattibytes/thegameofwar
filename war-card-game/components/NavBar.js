import Link from 'next/link';
import styles from '../styles/Home.module.css'

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.nav_header}>
        <Link href="/">Home |</Link> 
        <Link href="/Instructions">Instructions |</Link> 
        <Link href="/Contact">Contact |</Link>
        <Link href="/Game">Play Game</Link>
      </div>
    </div>
  );
};


export default Navbar;