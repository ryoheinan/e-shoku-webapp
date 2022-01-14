import type { NextPage } from 'next'
import { UserForm, UserData } from '../types/UserInfo'
import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useForm, SubmitHandler } from 'react-hook-form'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRequireUserInfo } from '../hooks/useRequireUserInfo'
import { useCurrentUser } from '../hooks/useCurrentUser'
import axios from 'axios'
import Error from './_error'
import Nav from '../components/nav'
import Loading from '../components/loading'
import { NextSeo } from 'next-seo'

const UserInfo: NextPage = () => {
  const { user, error: errAuth, isLoading } = useUser()
  const [isDataLoading, setIsDataLoading] = useState(true)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues: {
      username: '',
      display_name: '',
      date_of_birth: '',
      gender: undefined,
      description: '',
    },
  })

  useEffect(() => {
    /**
     * ユーザー情報の取得
     */
    const getUser = async () => {
      // async/awaitは非同期処理
      try {
        setIsDataLoading(true) // ローディング画面開始
        const res = await axios.get<UserData>('/api/users', { timeout: 6000 })
        const inputValues: UserForm = res.data
        setIsDataLoading(false) // ローディング画面終了
        reset(inputValues) // resetでフォームにデータを表示
      } catch {
        alert('データの取得に失敗しました')
      }
    }
    getUser()
  }, [reset])

  /**
   * 送信時の処理
   * @param {UserForm} data
   */
  const onSubmit: SubmitHandler<UserForm> = (data: UserForm) => {
    const dt = new Date(data.date_of_birth)
    data.date_of_birth = `${dt.getFullYear()}-${
      dt.getMonth() + 1
    }-${dt.getDate()}`
    data.image_url = user?.picture || ''
    axios
      .post('/api/users', data) //postは登録、getは取得、patchは一部更新
      .then(() => alert('正常に更新されました'))
      .catch(() => alert('更新できませんでした'))
  }

  useRequireUserInfo()
  const { userChecking } = useCurrentUser()

  if (errAuth || !user) {
    return <Error statusCode={400} />
  }
  return (
    <Nav>
      <NextSeo
        title="ユーザー設定 | e-Shoku"
        openGraph={{ title: 'ユーザー設定 | e-Shoku' }}
      />
      <div className="container">
        <h2 className="title">ユーザー設定</h2>
        {(isLoading || isDataLoading || userChecking) && <Loading />}
        {user && !isLoading && !isDataLoading && (
          <div>
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
                  保存
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
export default withPageAuthRequired(UserInfo, {
  onRedirecting: () => <Loading />,
  onError: (error) => <Error statusCode={400} title={error.message} />,
})
