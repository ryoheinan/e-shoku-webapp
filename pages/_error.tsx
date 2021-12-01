import type { NextPageContext } from 'next'
import Head from 'next/head'
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
          <Head>
            <title>
              {statusCode
                ? `${statusCode}: ${title}`
                : 'Application error: a client-side exception has occurred'}
            </title>
          </Head>
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
              <h2 style={styles.h2}>
                {this.props.title || statusCode ? (
                  title
                ) : (
                  <>
                    Application error: a client-side exception has occurred (see
                    the browser console for more information)
                  </>
                )}
                .
              </h2>
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
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  h2: {
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0,
  },
}
