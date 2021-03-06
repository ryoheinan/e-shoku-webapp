import type { NextPage } from 'next'
import { UserForm } from '../types/UserInfo'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'
import Error from './_error'
import Nav from '../components/nav'
import Loading from '../components/loading'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useState } from 'react'
import { NextSeo } from 'next-seo'

const SignUp: NextPage = () => {
  const { user, error: errAuth, isLoading } = useUser()
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  const [isDataLoading, setIsDataLoading] = useState(false)
  if (currentUser?.is_info_filled) {
    router.push('/')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>() // react-hook-formの宣言的なもの

  /**
   * 送信時の処理
   * @param {UserForm} data
   */
  const onSubmit: SubmitHandler<UserForm> = (data: UserForm) => {
    //データの送信
    setIsDataLoading(true)
    const dt = new Date(data.date_of_birth)
    data.date_of_birth = `${dt.getFullYear()}-${
      dt.getMonth() + 1
    }-${dt.getDate()}`
    data.image_url = user?.picture || ''
    axios
      .post('/api/users', data)
      .then(() => {
        setIsDataLoading(false)
      })
      .then(() => router.push(`/`))
      .catch(() => alert('登録に失敗しました'))
  }

  if (errAuth || !user) {
    return <Error statusCode={400} />
  }
  return (
    <Nav bottomNav={false}>
      <NextSeo
        title="ユーザー登録 | e-Shoku"
        openGraph={{ title: 'ユーザー登録 | e-Shoku' }}
      />
      <div className="container">
        <h2 className="title">ユーザー登録</h2>
        {(isLoading || isDataLoading) && <Loading />}
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
                      pattern: /^[A-Za-z0-9\_]+$/i,
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
                  自己紹介（500文字以内）
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
      </div>
    </Nav>
  )
}

// ログイン必須にする処理
// ログインしてない場合はログイン画面に飛ばされる
export default withPageAuthRequired(SignUp, {
  onRedirecting: () => <Loading />,
  onError: (error) => <Error statusCode={400} title={error.message} />,
})
