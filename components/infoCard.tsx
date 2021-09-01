import styles from './roomCard.module.scss'

const InfoCard = ({
  title,
  color,
  fontSize,
  children,
}: {
  title: string
  color: string
  fontSize: string
  children?: React.ReactNode
}) => {
  return (
    <div className={`shadow rounded`} style={{ backgroundColor: color }}>
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
  )
}

export default InfoCard
