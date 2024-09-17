import YouTube from 'react-youtube';

function YouTubeEmbed({ src }) {
  const videoId = src.split('v=')[1];
  const opts = {
    height: '315',
    width: '560',
    playerVars: {
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
}

export default YouTubeEmbed;