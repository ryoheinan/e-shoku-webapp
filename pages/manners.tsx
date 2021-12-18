import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '../components/nav'
import styles from '../styles/manners.module.scss'

const Manner: NextPage = () => {
  return (
    <Nav>
      <Head>
        <title>Manner | e-Shoku</title>
      </Head>

      <section className="container">
        <div>
          <h5 className={styles.manner_title}>マスクの着用について</h5>

          <div className={styles.sentence}>
            会話の際には必ずマスクを着用してください。
          </div>
        </div>

        <div>
          <h5 className={styles.manner_title}>大声での会話について</h5>

          <div className={styles.sentence}>思いつかねぇなぁ</div>
        </div>

        <div>
          <h5 className={styles.manner_title}>手洗い・消毒について</h5>

          <div className={styles.sentence}>入店、退店時に徹底してくれ</div>
        </div>
      </section>
    </Nav>
  )
}

export default Manner
