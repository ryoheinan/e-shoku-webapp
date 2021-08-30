import styles from './roomCard.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const RoomCard = ({
  title,
  date,
  imageUrl,
  participants,
}: {
  title: string
  date?: string
  imageUrl?: string
  participants?: number
}) => {
  return (
    <div className={'card text-white'}>
      <div className={styles.bgWrapper}>
        <Image
          alt="Foods"
          src="/images/foods.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default RoomCard
