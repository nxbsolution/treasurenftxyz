import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoMessage({ handleVideoComplete, videoLink }: { handleVideoComplete: () => void, videoLink: string }) {

  return (
    <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card'>
      <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Watch this video before applying salary</h1>
      <h2 className="text-xl text-center font-bold text-primary max-sm:text-lg max-sm:font-semibold">Keep Watching! Finish the video to see the form</h2>
      <div className="player-wrapper relative pt-[56.25%]">
        <ReactPlayer
          url={videoLink}
          className="absolute top-0 left-0"
          width="100%"
          height="100%"
          playing={true}
          playsinline={true}
          controls
          onEnded={handleVideoComplete}
        />
      </div >
    </div >
  )
}