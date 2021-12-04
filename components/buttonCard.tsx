import Link from 'next/link'
import styles from './buttonCard.module.scss'

interface Params {
  title: string
  color: string
  fontSize: string
  shadow: boolean
  link?: LinkParams
  linkColor?: string
  children?: React.ReactNode
}

interface LinkParams {
  to: string
  useAnchorOnly?: boolean
  target?: '_blank' | '_self' | '_parent' | '_top'
}

const ButtonCard = ({
  title,
  color,
  fontSize,
  shadow,
  link,
  linkColor = '#000000',
  children,
}: Params) => {
  return (
    <>
      {link?.to && !link?.useAnchorOnly && (
        <Link href={link.to}>
          <a className={styles.link} style={{ color: linkColor }}>
            <div
              className={`rounded ${shadow ? styles.cardShadow : ''}`}
              style={{ backgroundColor: color }}
            >
              {children ? (
                <div
                  className={
                    'd-flex justify-content-center align-items-center py-3 px-2'
                  }
                  style={{ fontSize: fontSize }}
                >
                  <div className={'me-1'}>{children}</div>
                  <div>{title}</div>
                </div>
              ) : (
                <div
                  className={'text-center py-3 px-2'}
                  style={{ fontSize: fontSize }}
                >
                  {title}
                </div>
              )}
            </div>
          </a>
        </Link>
      )}
      {link?.to && link?.useAnchorOnly && (
        <a
          className={styles.link}
          href={link.to}
          rel="noopener noreferrer nofollow"
          style={{ color: linkColor }}
          {...(link.target && { target: link.target })}
        >
          <div
            className={`rounded ${shadow ? styles.cardShadow : ''}`}
            style={{ backgroundColor: color }}
          >
            {children ? (
              <div
                className={
                  'd-flex justify-content-center align-items-center py-3 px-2'
                }
                style={{ fontSize: fontSize }}
              >
                <div className={'me-1'}>{children}</div>
                <div>{title}</div>
              </div>
            ) : (
              <div className={''}>{title}</div>
            )}
          </div>
        </a>
      )}
      {!Link && (
        <div
          className={`rounded ${shadow ? styles.cardShadow : ''}`}
          style={{ backgroundColor: color }}
        >
          {children ? (
            <div
              className={
                'd-flex justify-content-center align-items-center py-3 px-2'
              }
              style={{ fontSize: fontSize }}
            >
              <div className={'me-1'}>{children}</div>
              <div>{title}</div>
            </div>
          ) : (
            <div className={''}>{title}</div>
          )}
        </div>
      )}
    </>
  )
}

export default ButtonCard
