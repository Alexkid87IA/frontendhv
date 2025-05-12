import React from 'react';

interface VideoEmbedProps {
  url: string;
  title: string;
}

export const VideoEmbed = ({ url, title }: VideoEmbedProps) => {
  // Convert YouTube URL to embed format if needed
  const getEmbedUrl = (url: string) => {
    const videoId = url.includes('embed') 
      ? url.split('/').pop() 
      : url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="w-full">
      <div className="relative w-full pb-[56.25%]">
        <iframe
          src={getEmbedUrl(url)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};