import styles from './roomCard.module.scss'
import Image from 'next/image'
import dayjs from 'dayjs'

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
    <div className={`text-white rounded ${styles.bgWrapper}`}>
      <Image
        alt="Foods"
        src={imageUrl}
        layout="fill"
        objectFit="cover"
        quality={50}
        className={styles.image}
      />
      <div className={`d-flex ${styles.content}`}>
        <div>
          <h3 className={'mb-2'}>{title}</h3>
          <p className={'mb-0'}>{dayjs(date).format('YYYY/MM/DD')}</p>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
