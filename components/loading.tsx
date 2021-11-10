import Image from 'next/image'

const Loading = ({ message = '読み込み中...' }: { message?: string }) => {
  return (
    <>
      <Image
        alt="Loading"
        src="/images/loading_icon.png"
        width={80}
        height={80}
      />
      <p>{message}</p>
    </>
  )
}

export default Loading
