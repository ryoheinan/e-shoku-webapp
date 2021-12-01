import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useForm, SubmitHandler } from 'react-hook-form'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRequireUserInfo } from '../../../hooks/useRequireUserInfo'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import axios from 'axios'
import Head from 'next/head'
import Nav from '../../../components/nav'
import Loading from '../../../components/loading'
import router, { useRouter } from 'next/router'
import { RoomData, RoomForm } from '../../../types/RoomInfo'

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
  } = useForm<RoomForm>() // RoomForm型のフォームの宣言

  useEffect(() => {
    /**
     * ユーザー情報の取得
     */
    const getRoom = async () => {
      // async{await}は非同期処理
      // async内のawaitが完了するまで次へは進まない、という意味
      try {
        setIsDataLoading(true) // ローディング画面開始
        const res = await axios.get(`/api/room/${id}`)
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
      } catch {
        alert('データの取得に失敗しました')
      }
    }
    getRoom()
  }, [id, reset])

  const onSubmit: SubmitHandler<RoomForm> = (data) => {
    // データの送信
    setIsDataLoading(true) // ローディング画面開始
    const dt = new Date(data.date)
    data.date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
    data.datetime = data.date + 'T' + data.time
    if (currentUser) {
      data.hosts = [currentUser.id]
      axios
        .put<RoomData>(`/api/room/edit/${id}`, data)
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
        const res = await axios.delete(`/api/room/edit/${id}/`)
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

  return (
    <Nav>
      <Head>
        <title>ルーム編集 | e-Shoku</title>
      </Head>
      <div className="container">
        <h2 className="title">ルーム編集</h2>
        {(isLoading || isDataLoading) && <Loading />}
        {errAuth && (
          // Error component を呼び出す予定
          <>
            <h4>Error</h4>
            <pre>{errAuth.message}</pre>
          </>
        )}
        {user && !isLoading && !isDataLoading && (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 row">
                <label htmlFor="room_name" className="col-sm-3 col-form-label">
                  タイトル
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
              <div className="mb-5 row">
                <label htmlFor="time" className="col-sm-3 col-form-label">
                  時間
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
  // onError: error => <ErrorMessage>{error.message}</ErrorMessage>
})
