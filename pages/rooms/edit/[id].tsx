import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useForm, SubmitHandler } from 'react-hook-form'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRequireUserInfo } from '../../../hooks/useRequireUserInfo'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import axios from 'axios'
import Error from '../../_error'
import Nav from '../../../components/nav'
import Loading from '../../../components/loading'
import { useRouter } from 'next/router'
import { RoomData, RoomForm } from '../../../types/RoomInfo'
import { NextSeo } from 'next-seo'

const EditRoom: NextPage = () => {
  const { user, error: errAuth, isLoading } = useUser()
  const [isDataLoading, setIsDataLoading] = useState(false)

  useRequireUserInfo() // ユーザー情報登録済みかどうかをチェック
  const { currentUser } = useCurrentUser() // ユーザー情報を取得

  const router = useRouter()
  const { id } = router.query

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomForm>({
    defaultValues: {
      room_name: '',
      description: '',
      date: '',
      time: '',
      capacity: 10,
      meeting_url: '',
    },
  }) // RoomForm型のフォームの宣言

  useEffect(() => {
    /**
     * ルーム情報の取得
     */
    const getRoom = async () => {
      // async{await}は非同期処理
      // async内のawaitが完了するまで次へは進まない、という意味
      try {
        setIsDataLoading(true) // ローディング画面開始
        const res = await axios.get(`/api/rooms/${id}`)
        const dt = new Date(res.data.datetime)

        let inputValues: RoomForm = res.data
        inputValues.date = `${dt.getFullYear()}-${
          dt.getMonth() + 1
        }-${dt.getDate()}`
        inputValues.time = `${dt.getHours().toString().padStart(2, '0')}:${dt
          .getMinutes()
          .toString()
          .padStart(2, '0')}`
        setIsDataLoading(false) // ローディング画面終了
        reset(inputValues) // resetでフォームにデータを表示
      } catch (error: unknown) {
        setIsDataLoading(false) // ローディング画面終了
        // Axiosに関するエラーの場合
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 500) {
            router.replace('/500')
          } else {
            router.replace('/404')
          }
        } else {
          router.replace('/500')
        }
      }
    }
    getRoom()
  }, [router, id, reset])

  const onSubmit: SubmitHandler<RoomForm> = (data) => {
    // データの送信
    setIsDataLoading(true) // ローディング画面開始
    const dt = new Date(data.date)
    data.date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
    data.datetime = data.date + 'T' + data.time
    if (currentUser) {
      data.hosts = [currentUser.id]
      axios
        .put<RoomData>(`/api/rooms/${id}`, data)
        .then((res) => {
          setIsDataLoading(false)
          return res
        })
        .then((res) => router.push(`../${res.data.id}`))
        .catch(() => alert('データの送信に失敗しました'))
    } else {
      // 本来我々がいるはずのない世界線
      setIsDataLoading(false)
    }
  }

  const deleteRoom = async () => {
    if (confirm(`本当にルームを削除しますか？`)) {
      setIsDataLoading(true)
      try {
        const res = await axios.delete(`/api/rooms/${id}/`)
        if (res.status === 204) {
          setIsDataLoading(false)
          router.push('/')
        }
      } catch (e) {
        setIsDataLoading(false)
        if (axios.isAxiosError(e) && e.response) {
          alert(`ルームの削除に失敗しました`)
        }
      }
    }
  }

  if ((errAuth || (!user && currentUser)) && !isLoading && !isDataLoading) {
    return <Error statusCode={400} />
  }
  return (
    <Nav>
      <NextSeo
        title="ルーム編集 | e-Shoku"
        openGraph={{ title: 'ルーム編集 | e-Shoku' }}
      />
      <div className="container">
        <h2 className="title">ルーム編集</h2>
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
                    placeholder="256文字以内で入力してください"
                  />
                  {errors.description && (
                    <p className="small text-danger">正しく入力してください</p>
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
              <div className="mb-5 row">
                <label htmlFor="meetingUrl" className="col-sm-3 col-form-label">
                  ミーティングURL
                  <div className="text-muted">ZoomもしくはGoogle Meet</div>
                </label>
                <div className="col-sm-9">
                  <input
                    {...register('meeting_url', {
                      pattern:
                        /^https:\/\/(meet\.google\.com|[A-Za-z0-9]+\.zoom\.us)\/[A-Za-z0-9/?=-]+$/,
                    })}
                    className={`form-control`}
                    id="meetingUrl"
                    type="url"
                  />
                  {errors.meeting_url && (
                    <p className="small text-danger">
                      正しいURLを入力してください
                    </p>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  onClick={deleteRoom}
                  className="btn btn-danger btn-delete"
                >
                  ルーム削除
                </button>
                <button type="submit" className="btn btn-form">
                  保存
                </button>
              </div>
            </form>
          </div>
        )}
        {!isLoading && !isDataLoading && !errAuth && !user && (
          // Error component を呼び出す予定
          <div className="text-center">データの取得に失敗しました</div>
        )}
      </div>
    </Nav>
  )
}

// ログイン必須にする処理
export default withPageAuthRequired(EditRoom, {
  onRedirecting: () => <Loading />,
  onError: (error) => <Error statusCode={400} title={error.message} />,
})
