import type { NextPage } from 'next'
import { RoomData, RoomForm } from '../../types/RoomInfo'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import Head from 'next/head'
import Error from '../_error'
import Nav from '../../components/nav'
import Loading from '../../components/loading'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useRequireUserInfo } from '../../hooks/useRequireUserInfo'
import { useRouter } from 'next/router'
import { useState } from 'react'

const CreateRoom: NextPage = () => {
  const { user, error: errAuth, isLoading } = useUser()
  const [isDataLoading, setIsDataLoading] = useState(false)

  useRequireUserInfo() // ユーザー情報登録済みかどうかをチェック
  const { currentUser } = useCurrentUser() // ユーザー情報を取得
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomForm>({
    defaultValues: {
      capacity: 10,
    },
  }) // RoomForm型のフォームの宣言

  const onSubmit: SubmitHandler<RoomForm> = (data) => {
    // データの送信
    setIsDataLoading(true) // ローディング画面開始
    const dt = new Date(data.date)
    data.date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
    data.datetime = data.date + 'T' + data.time
    if (currentUser) {
      data.hosts = [currentUser.id]
      axios
        .post<RoomData>('/api/room/', data)
        .then((res) => {
          setIsDataLoading(false)
          return res
        })
        .then((res) => router.push(`/room/${res.data.id}`))
        .catch(() => alert('データの送信に失敗しました'))
    } else {
      // 本来我々がいるはずのない世界線
      setIsDataLoading(false)
    }
  }

  if ((errAuth || (!user && currentUser)) && !isLoading && !isDataLoading) {
    return <Error statusCode={400} />
  }
  return (
    <Nav>
      <Head>
        <title>ルーム作成 | e-Shoku</title>
      </Head>
      <div className="container">
        <h2 className="title">ルーム作成</h2>
        {(isLoading || isDataLoading) && <Loading />}
        {user && !isLoading && !isDataLoading && (
          <div>
            <p className="text-end text-danger">必須*</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 row">
                <label htmlFor="room_name" className="col-sm-3 col-form-label">
                  タイトル
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    {...register('room_name', {
                      required: true,
                      maxLength: 64,
                    })}
                    className={`form-control`}
                    id="room_name"
                    placeholder="例)サークル飲み会"
                  />
                  {errors.room_name && (
                    <p className="small text-danger">正しく入力してください</p>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="description"
                  className="col-sm-3 col-form-label"
                >
                  説明
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-9">
                  <textarea
                    {...register('description', {
                      required: true,
                      maxLength: 256,
                    })}
                    className={`form-control`}
                    id="description"
                  />
                  {errors.description && (
                    <p className="small text-danger">
                      256文字以内で正しく入力してください
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="date" className="col-sm-3 col-form-label">
                  日付
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    {...register('date', { required: true })}
                    className={`form-control`}
                    id="date"
                    type="date"
                  />
                  {errors.date && (
                    <p className="small text-danger">正しく入力してください</p>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="time" className="col-sm-3 col-form-label">
                  時間
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    {...register('time', { required: true })}
                    className={`form-control`}
                    id="genderId"
                    type="time"
                  ></input>
                  {errors.time && (
                    <p className="small text-danger">正しく入力してください</p>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="capacity" className="col-sm-3 col-form-label">
                  参加上限人数
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    {...register('capacity', {
                      required: true,
                      min: 1,
                    })}
                    className={`form-control`}
                    id="capacity"
                    type="number"
                  />
                  {errors.capacity && (
                    <p className="small text-danger">
                      1以上の数字を入力してください
                    </p>
                  )}
                </div>
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-form">
                  作成
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Nav>
  )
}

// ログイン必須にする処理
// ログインしてない場合はログイン画面に飛ばされる
export default withPageAuthRequired(CreateRoom, {
  onRedirecting: () => <Loading />,
  onError: (error) => <Error statusCode={400} title={error.message} />,
})
