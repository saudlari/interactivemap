import React from 'react';

interface VideoPreviewProps {
  link: string;
  style?: React.CSSProperties;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ link, style }) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/;

  if (youtubeRegex.test(link)) {
    const videoId = link.split('v=')[1]?.split('&')[0];
    return (
      <div style={style}>
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  } else if (vimeoRegex.test(link)) {
    const videoId = link.split('/').pop();
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
