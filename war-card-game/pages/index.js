import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>War Card Game</title>
        <meta name="description" content="Hackathon Card Game Challenge" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous"></link>
      </Head>

      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to War Card Game<br></br><a href="https://info.mintbean.io/" target="_blank" alt="mintbean">Mintbean Hackathon</a>
        </h1>
        <a href="/Game">
          <h1 className={styles.landing}>Enter Game</h1>
        </a>
        <a href="/Instructions">
          <h1 className={styles.landing}>See the Rules</h1>
        </a>
      </main>
      <Footer />
    </div>
  )
}
