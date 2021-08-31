import styles from './roomCard.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const RoomCard = ({
  title,
  date,
  imageUrl,
}: {
  title: string
  date: string
  imageUrl: string
}) => {
  return (
    <div className={'card text-white'}>
      <div className={styles.bgWrapper}>
        <Image
          alt="Foods"
          src={imageUrl}
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.image}
        />
      </div>
      <div className={`d-flex ${styles.content}`}>
        <div>
          <h3 className={'mb-2'}>{title}</h3>
          <p className={'mb-0'}>{date}</p>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
