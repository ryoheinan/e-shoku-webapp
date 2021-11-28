import axios from 'axios'
import styles from './roomActionBtn.module.scss'
import { useCurrentUser } from '../hooks/useCurrentUser'

interface Props {
  mode: 'join' | 'leave'
  roomId: string
  text: string
  disabled?: boolean
}

export const RoomActionBtn = ({
  mode,
  roomId,
  text,
  disabled = false,
}: Props) => {
  const { currentUser } = useCurrentUser()
  const btnHandler = async () => {
    const modeText = mode === 'join' ? '参加' : '参加キャンセル'
    const result = confirm(`本当に${modeText}しますか？`)
    if (result && !disabled) {
      try {
        if (currentUser) {
          const sendData = { id: currentUser.id }
          const response = await axios.post(
            `/api/room/${mode}/${roomId}`,
            sendData
          )
          console.log(response)
        }
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          alert(`${modeText}の処理が失敗しました`)
        }
      }
    }
  }
  return (
    <button
      onClick={btnHandler}
      className={`btn rounded text-center py-3 px-2 ${styles.roomActionBtn}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
