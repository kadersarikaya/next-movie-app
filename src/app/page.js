import Image from 'next/image'
import styles from './page.module.css'
import Movies from './movies/page'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Trend Movies</h1>
      <Movies />
    </main>
  )
}
