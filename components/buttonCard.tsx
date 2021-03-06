import Link from 'next/link'
import styles from './buttonCard.module.scss'

interface Params {
  title: string
  color: string
  fontSize: string
  fontWeight?: number
  shadow: boolean
  link?: LinkParams
  linkColor?: string
  disabled?: boolean
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
  fontWeight = 500,
  shadow,
  link,
  linkColor = '#000000',
  disabled = false,
  children,
}: Params) => {
  return (
    <>
      {link?.to && !link?.useAnchorOnly && (
        <Link href={link.to}>
          <a className={styles.link} style={{ color: linkColor }}>
            <div
              className={`rounded ${shadow ? styles.cardShadow : ''} ${
                disabled ? 'disabled' : ''
              }`}
              style={{ backgroundColor: color }}
            >
              {children ? (
                <div
                  className={
                    'd-flex justify-content-center align-items-center py-3 px-2'
                  }
                  style={{ fontSize: fontSize, fontWeight: fontWeight }}
                >
                  <div className={'me-1'}>{children}</div>
                  <div>{title}</div>
                </div>
              ) : (
                <div
                  className={'text-center py-3 px-2'}
                  style={{ fontSize: fontSize, fontWeight: fontWeight }}
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
            className={`rounded ${shadow ? styles.cardShadow : ''} ${
              disabled ? 'disabled' : ''
            }`}
            style={{ backgroundColor: color }}
          >
            {children ? (
              <div
                className={
                  'd-flex justify-content-center align-items-center py-3 px-2'
                }
                style={{ fontSize: fontSize, fontWeight: fontWeight }}
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
      {!link && (
        <div
          className={`rounded ${shadow ? styles.cardShadow : ''} ${
            disabled ? 'disabled' : ''
          }`}
          style={{ backgroundColor: color }}
        >
          {children ? (
            <div
              className={
                'd-flex justify-content-center align-items-center py-3 px-2'
              }
              style={{ fontSize: fontSize, fontWeight: fontWeight }}
            >
              <div className={'me-1'}>{children}</div>
              <div>{title}</div>
            </div>
          ) : (
            <div
              className={
                'd-flex justify-content-center align-items-center py-3 px-2'
              }
              style={{ fontSize: fontSize, fontWeight: fontWeight }}
            >
              {title}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ButtonCard
