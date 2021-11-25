import type { NextPage } from 'next'
import { RoomData, RoomForm } from '../../types/RoomInfo'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import Head from 'next/head'
import Nav from '../../components/nav'
import Loading from '../../components/loading'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useRequireUserInfo } from '../../hooks/useRequireUserInfo'

const CreateRoom: NextPage = () => {
  const { user, error: errAuth, isLoading } = useUser()

  useRequireUserInfo() // ユーザー情報登録済みかどうかをチェック
  const { currentUser } = useCurrentUser() // ユーザー情報を取得

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomForm>() // RoomForm型のフォームの宣言

  const onSubmit: SubmitHandler<RoomForm> = (data) => {
    // データの送信
    const dt = new Date(data.date)
    data.date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
    data.time = '' // 修正必須
    data.datetime = data.date + 'T' + data.time
    if (currentUser) {
      data.hosts = [currentUser.id]
      axios
        .post<RoomData>('/api/room/create', data)
        .then((res) => console.log(res.data)) //ここで詳細ページにリダイレクト予定
    }

    // プロミス構文 データを取得してから、待ってやる
    // axios;PythonのRequest
    // thenは成功したら
    // catchはエラー
    // (res) => console.log(res.data)はfunction(res)と同じ
  }
  return (
    <Nav>
      <Head>
        <title>ルーム作成 | e-Shoku</title>
      </Head>
      <div className="container">
        <h2 className="title">ルーム作成</h2>
        {isLoading && <Loading />}
        {errAuth && (
          // Error component を呼び出す予定
          <>
            <h4>Error</h4>
            <pre>{errAuth.message}</pre>
          </>
        )}
        {user && (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 row">
                <label htmlFor="roomName" className="col-sm-3 col-form-label">
                  タイトル
                </label>
                <div className="col-sm-9">
                  <input
                    {...register('room_name', {
                      required: true,
                      maxLength: 64,
                    })}
                    className={`form-control`}
                    id="roomName"
                    placeholder="例)フットボールサークル飲み会"
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
                  <input
                    {...register('description', {
                      required: true,
                      minLength: 10,
                      maxLength: 256,
                    })}
                    className={`form-control`}
                    id="description"
                    placeholder="例) ichiro"
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
              <div className="mb-3 row">
                <label htmlFor="time" className="col-sm-3 col-form-label">
                  時間
                </label>
                <div className="col-sm-9">
                  <input
                    {...register('time', { required: true })}
                    className={`form-control`}
                    id="genderId"
                  ></input>
                  {errors.time && (
                    <p className="small text-danger">正しく入力してください</p>
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
        {!isLoading && !errAuth && !user && (
          // Error component を呼び出す予定
          <div className="text-center">データの取得に失敗しました</div>
        )}
      </div>
    </Nav>
  )
}

// ログイン必須にする処理
// ログインしてない場合はログイン画面に飛ばされる
export default withPageAuthRequired(CreateRoom, {
  onRedirecting: () => <Loading />,
  // onError: error => <ErrorMessage>{error.message}</ErrorMessage>
})
