import Image from 'next/image'
import styles from './loading.module.scss'

const Loading = ({ message = '読み込み中...' }: { message?: string }) => {
  return (
    <div className={`text-center ${styles.elementCenter}`}>
      <div>
        <Image
          alt={message}
          src="/images/loading_icon.png"
          width={80}
          height={80}
        />
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Loading
