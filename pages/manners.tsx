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
            ワクチンを接種していても、感染の可能性は十分にあります。
            小さなボリュームでの発声も飛沫が飛びます。
            感染拡大を抑える為にも、マスク着用にご協力ください。
            (店舗のルールとして定められていなくても、自分や周囲の人を守るため、マスクを着用してください。)
          </div>
        </div>

        <div>
          <h5 className={styles.manner_title}>変更するかも</h5>

          <div className={styles.sentence}>内容未定</div>
        </div>

        <div>
          <h5 className={styles.manner_title}>手洗い・消毒について</h5>

          <div className={styles.sentence}>
            入店時、退店時、お手洗いの直後やメニュー表など、多くの人が使うものを触った後には
            必ずアルコールでの消毒、もしくは手洗いを徹底してください。
            設置していない店舗もあるため、余裕がある方は薬局などで、
            除菌シート、除菌スプレーの購入をお勧めいたします。
          </div>
        </div>
      </section>
    </Nav>
  )
}

export default Manner
