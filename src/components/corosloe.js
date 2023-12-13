// AttachmentCarousel.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";

const AttachmentCarousel = ({ attachments, post_id, live }) => {
  return (
    <Carousel>
      {live
        ? attachments.video_attachments.map((video_url, index) => (
            <div key={index} >
              <VideoPlayer
                video_rec_url={video_url.video_url}
                frameBorder="0"
                post_id={post_id}
                live={live}
              />
            </div>
          ))
        : [
            ...attachments.video_attachments.map((video_url, index) => (
              <div key={index}>
                <VideoPlayer
                  video_rec_url={video_url.video_url}
                  frameBorder="0"
                  post_id={post_id}
                  live={live}
                  
                  
                />
              </div>
            )),
            ...attachments.image_attachments.map((image, index) => (
              <div key={index}>
                <img
                  src={image.image_url}
                  alt={` ${index + 1}`}
                  style={{
                    width: "80%",
                    height: "100%",
                    objectFit: "contain",
                    minWidth: "80%",
                  }}
                />
              </div>
            )),
            ...attachments.audio_attachments.map((audio_url, index) => (
              <div key={index}>
                <AudioPlayer audio_url={audio_url.audio_url} />
              </div>
            )),
          ]}
    </Carousel>
  );
};

export default AttachmentCarousel;
