import type { NextPageContext } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import Nav from '../components/nav'

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  403: 'Forbidden / アクセス権がありません',
  404: 'お探しのページは見つかりませんでした',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}

export type ErrorProps = {
  statusCode: number
  title?: string
}

function _getInitialProps({
  res,
  err,
}: NextPageContext): Promise<ErrorProps> | ErrorProps {
  const statusCode =
    res && res.statusCode ? res.statusCode : err ? err.statusCode! : 404
  return { statusCode }
}

/**
 * `Error` component used for handling errors.
 */
export default class Error<P = {}> extends React.Component<P & ErrorProps> {
  static displayName = 'ErrorPage'

  static getInitialProps = _getInitialProps
  static origGetInitialProps = _getInitialProps

  render() {
    const { statusCode } = this.props
    const title =
      this.props.title ||
      statusCodes[statusCode] ||
      'An unexpected error has occurred'

    return (
      <div style={styles.error}>
        <Nav>
          <NextSeo
            title={
              statusCode
                ? `${statusCode}: ${title} | e-Shoku`
                : 'Application error: a client-side exception has occurred'
            }
            openGraph={{
              title: statusCode
                ? `${statusCode}: ${title} | e-Shoku`
                : 'Application error: a client-side exception has occurred',
            }}
          />
          <div>
            <section className="text-center mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="72px"
                viewBox="0 0 24 24"
                width="72px"
                fill="#e05d5d"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </section>

            <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0 }' }} />
            {statusCode ? <h1>{statusCode}</h1> : null}
            <div>
              <p>
                {this.props.title || statusCode ? (
                  title
                ) : (
                  <>
                    Application error: a client-side exception has occurred (see
                    the browser console for more information)
                  </>
                )}
              </p>
            </div>
          </div>
        </Nav>
      </div>
    )
  }
}

const styles: { [k: string]: React.CSSProperties } = {
  error: {
    color: '#000',
    background: '#fff',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
