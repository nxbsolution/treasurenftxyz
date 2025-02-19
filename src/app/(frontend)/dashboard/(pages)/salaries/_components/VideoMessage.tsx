export default function VideoMessage({ handleVideoComplete }: { handleVideoComplete: () => void }) {

  return (
    <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card'>
      <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Salary Apply Method</h1>
      <iframe width={"100%"} style={{ aspectRatio: "16/9" }} src="https://www.youtube.com/embed/6--TvFJBf3U" title="Apply Method Salary" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
    </div >
  )
}