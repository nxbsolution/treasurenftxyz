import { useEffect } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function VideoMessage({ handleVideoComplete, videoLink }: { handleVideoComplete: () => void, videoLink: string }) {

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Create YouTube player
    let player: any;
    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player('youtube-player', {
        events: {
          'onStateChange': (event: { data: number }) => {
            // Video finished playing
            if (event.data === window.YT.PlayerState.ENDED) {
              handleVideoComplete();
            }
          }
        }
      });
    };

  }, [handleVideoComplete]);

  return (
    <div className='border shadow-lg p-6 max-sm:p-4 rounded-lg max-w-7xl w-3/4 max-md:w-9/12 max-sm:w-11/12 mx-auto space-y-2 bg-card'>
      <h1 className='text-3xl text-center font-bold text-primary max-sm:text-2xl max-sm:font-semibold'>Watch this video before applying salary</h1>
      <h2 className="text-xl text-center font-bold text-primary max-sm:text-lg max-sm:font-semibold">Keep Watching! Finish the video to see the form</h2>
      <iframe
        id="youtube-player"
        width={"100%"}
        style={{ aspectRatio: "16/9" }}
        src={`${videoLink}?enablejsapi=1&autoplay=1`}
        title="Apply Method Salary"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div >
  )
}