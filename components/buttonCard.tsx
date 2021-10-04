import Link from 'next/link'
import styles from './buttonCard.module.scss'

const ButtonCard = ({
  title,
  color,
  fontSize,
  shadow,
  link,
  linkColor = '#000000',
  children,
}: {
  title: string
  color: string
  fontSize: string
  shadow: boolean
  link?: string
  linkColor?: string
  children?: React.ReactNode
}) => {
  return (
    <>
      {link ? (
        <Link href={link}>
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
                <div className={''}>{title}</div>
              )}
            </div>
          </a>
        </Link>
      ) : (
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
