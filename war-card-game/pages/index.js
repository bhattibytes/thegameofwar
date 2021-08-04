import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>War Card Game</title>
        <meta name="description" content="Hackathon Card Game Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.nav}>
          <div className={styles.nav_header}>
            <ul className={styles.links}>
              <li>
                <a href="/index">Home</a>
              </li>
              <li>
                <a href="/Instructions">Rules</a>
              </li>
              <li>
                <a href="/Contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
  
        <h1 className={styles.title}>
          ~ Welcome to War Card Game ~ <br></br><a href="https://info.mintbean.io/" target="_blank" alt="mintbean">Mintbean Hackathon</a>
        </h1>
        <a href="/Game">
          <h1>Enter Game</h1>
        </a>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
