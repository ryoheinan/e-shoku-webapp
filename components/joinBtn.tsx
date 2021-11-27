import axios from 'axios'
import styles from './joinBtn.module.scss'
import { useCurrentUser } from '../hooks/useCurrentUser'

const JoinBtn = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useCurrentUser()
  const joinHandler = async () => {
    // confirm処理をいれる
    try {
      if (currentUser) {
        const sendData = { id: currentUser.id }
        const response = await axios.post(`/api/room/join/${roomId}`, sendData)
        console.log(response)
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data)
      }
    }
  }
  return (
    <button
      onClick={joinHandler}
      className={`btn rounded text-center py-3 px-2 ${styles.joinBtn}`}
    >
      参加する
    </button>
  )
}

export default JoinBtn
