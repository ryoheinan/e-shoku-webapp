import Image from 'next/image'

const Loading = ({ message = '読み込み中...' }: { message?: string }) => {
  return (
    <div className="text-center">
      <Image
        alt="Loading"
        src="/images/loading_icon.png"
        width={80}
        height={80}
      />
      <p>{message}</p>
    </div>
  )
}

export default Loading
