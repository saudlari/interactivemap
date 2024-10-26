import React from 'react';

interface VideoPreviewProps {
  videoLink: string;
  style?: React.CSSProperties;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoLink, style }) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/;

  if (youtubeRegex.test(videoLink)) {
    const videoId = videoLink.split('v=')[1]?.split('&')[0];
    return (
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  } else if (vimeoRegex.test(videoLink)) {
    const videoId = videoLink.split('/').pop();
    return (
      <div style={style}>
        <iframe
          width="100%"
          height="200"
          src={`https://player.vimeo.com/video/${videoId}`}
          title="Vimeo video player"
          style={{ border: 'none' }} 
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return null;
};

export default VideoPreview;
