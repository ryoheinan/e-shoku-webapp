import axios from 'axios'
import { useRouter } from 'next/router'
import styles from './roomActionBtn.module.scss'
import { useCurrentUser } from '../hooks/useCurrentUser'

interface Props {
  mode: 'join' | 'leave'
  roomId: string
  text: string
  disabled?: boolean
  bgColor?: string
  textColor?: string
}

const RoomActionBtn = ({
  mode,
  roomId,
  text,
  disabled = false,
  bgColor = '#6fd8a3',
  textColor = '#000000',
}: Props) => {
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  const btnHandler = async () => {
    let isConfirm = mode === 'join' ? true : false
    if (!isConfirm) {
      isConfirm = confirm('本当に参加をキャンセルしますか？')
    }
    if (isConfirm && !disabled) {
      try {
        if (currentUser) {
          const sendData = { id: currentUser.id }
          const res = await axios.post(`/api/rooms/${mode}/${roomId}`, sendData)
          if (res.status === 200) {
            router.push(`/rooms/${roomId}`)
          }
        }
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          alert('処理が失敗しました')
        }
      }
    }
  }
  return (
    <button
      onClick={btnHandler}
      className={`btn rounded text-center py-3 px-2 ${styles.roomActionBtn}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default RoomActionBtn
