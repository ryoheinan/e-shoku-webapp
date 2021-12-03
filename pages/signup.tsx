import type { NextPage } from 'next'
import { UserForm } from '../types/UserInfo'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Nav from '../components/nav'
import Loading from '../components/loading'
import { useCurrentUser } from '../hooks/useCurrentUser'

const SignUp: NextPage = () => {
  const { user, error: errAuth, isLoading } = useUser()
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  if (currentUser?.is_info_filled) {
    router.push('/')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>() //4行目のからimport、react-hook-form

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    //データの送信
    const dt = new Date(data.date_of_birth)
    data.date_of_birth = `${dt.getFullYear()}-${
      dt.getMonth() + 1
    }-${dt.getDate()}`
    axios.post('/api/user', data).then((res) => console.log(res.data))
    //プロミス構文 データを取得してから、待ってやる
    //axios;PythonのRequest
    //thenは成功したら
    //catchはエラー
    //(res) => console.log(res.data)はfunction(res)と同じ
  }
  return (
    <Nav bottomNav={false}>
      <Head>
        <title>ユーザー登録 | e-Shoku</title>
      </Head>
      <div className="container">
        <h2 className="title">ユーザー登録</h2>
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
            <p className="text-danger">
              e-Shokuを使うにはユーザー情報を登録する必要があります
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-3 col-form-label"
                >
                  メールアドレス
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="staticEmail"
                    value={user.email as string}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="displayName"
                  className="col-sm-3 col-form-label"
                >
                  名前
                </label>
                <div className="col-sm-9">
                  <input
                    {...register('display_name', {
                      required: true,
                      maxLength: 128,
                    })}
                    className={`form-control`}
                    id="displayName"
                    placeholder="例) 坂村 一郎"
                  />
                  {errors.display_name && (
                    <p className="small text-danger">正しく入力してください</p>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="usernameId" className="col-sm-3 col-form-label">
                  ユーザーネーム（半角英数）
                </label>
                <div className="col-sm-9">
                  <input
                    {...register('username', {
                      required: true,
                      minLength: 2,
                      maxLength: 128,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                    className={`form-control`}
                    id="usernameId"
                    placeholder="例) ichiro"
                  />
                  {errors.username && (
                    <p className="small text-danger">正しく入力してください</p>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="dateOfBirthId"
                  className="col-sm-3 col-form-label"
                >
                  生年月日
                </label>
                <div className="col-sm-9">
                  <input
                    {...register('date_of_birth', { required: true })}
                    className={`form-control`}
                    id="dateOfBirthId"
                    type="date"
                  />
                  {errors.date_of_birth && (
                    <p className="small text-danger">正しく入力してください</p>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="genderId" className="col-sm-3 col-form-label">
                  性別
                </label>
                <div className="col-sm-9">
                  <select
                    {...register('gender', { required: true })}
                    className="form-select"
                    id="genderId"
                    aria-label="性別を選択してください"
                  >
                    <option value="">選択してください…</option>
                    <option value="MALE">男性</option>
                    <option value="FEMALE">女性</option>
                    <option value="PNTS">答えない</option>
                    <option value="OTHERS">その他</option>
                  </select>
                  {errors.gender && (
                    <p className="small text-danger">正しく選択してください</p>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="description"
                  className="col-sm-3 col-form-label"
                >
                  自己紹介(500文字以内)
                </label>
                <div className="col-sm-9">
                  <textarea
                    {...register('description', {
                      required: false,
                      maxLength: 500,
                    })}
                    className={`form-control`}
                    id="description"
                  />
                  {errors.description && (
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
export default withPageAuthRequired(SignUp, {
  onRedirecting: () => <Loading />,
  // onError: error => <ErrorMessage>{error.message}</ErrorMessage>
})
