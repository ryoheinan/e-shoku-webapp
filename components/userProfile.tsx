import Image from 'next/image'
import { UserData } from '../types/UserInfo'
import styles from './userProfile.module.scss'

export const UserProfile = ({
  data,
  profileIcon,
  isShortDescription = true,
}: {
  data: UserData
  profileIcon: string | null | undefined
  isShortDescription?: boolean
}) => {
  return (
    <div className="card py-3">
      <div className="d-flex align-items-center justify-content-center mb-2">
        <Image
          src={profileIcon ? profileIcon : '/images/default_icon.jpg'}
          alt="プロフィール画像"
          width={75}
          height={75}
          className={styles.profileImage}
        />
        <div className={styles.displayName}>{data.display_name}</div>
      </div>
      <div className={styles.profileItem}>
        <dl>
          <dt>ユーザーネーム</dt>
          <dd>@{data.username}</dd>
        </dl>
      </div>
      <div className="d-flex justify-content-center">
        {isShortDescription ? (
          <p className={styles.profileShortDescription}>{data.description}</p>
        ) : (
          <p className={styles.profileDescription}>{data.description}</p>
        )}
      </div>
    </div>
  )
}
