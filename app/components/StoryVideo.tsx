"use client";

import { useRef } from "react";

export default function StoryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      controls
      preload="none"
      poster="/video-poster.jpg"
      className="w-full aspect-video object-cover bg-black cursor-pointer"
      onClick={() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }}
    >
      <source src="/gemach-video.mp4" type="video/mp4" />
    </video>
  );
}
