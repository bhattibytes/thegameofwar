import Link from 'next/link';
import styles from '../styles/Home.module.css'

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.nav_header}>
        <nav className="navbar navbar-expand-xl navbar-light">
          <div className="container-fluid">
            <div className={styles.link_container}>
              <Link className={styles.home_link} href="/">Home</Link> 
              <Link className={styles.instructions_link} href="/Instructions">Instructions</Link> 
              <Link className={styles.contact_link} href="/Contact">Contact</Link>
              <Link className={styles.game_link} href="/Game">Game</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};


export default Navbar;