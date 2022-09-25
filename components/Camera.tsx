import React, { useEffect, useRef, useState } from "react";

interface CameraProps {
  on: boolean;
}

const Camera: React.FC<CameraProps> = ({ on }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let photoRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<Blob | null>();

  useEffect(() => {
    console.log(image);
  }, [image]);

  const getVideo = () => {
    if (on) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          let video = videoRef.current;
          if (video) {
            video.srcObject = stream;
            video.play();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const takePicture = () => {
    const width = 400;
    const height = width / (4 / 3);

    let video = videoRef.current;

    let photo = photoRef.current;
    if (photo && video) {
      photo.width = width;

      photo.height = height;

      let ctx = photo.getContext("2d");

      ctx?.drawImage(video, 0, 0, width, height);

      photo.toBlob((blob) => {
        setImage(blob);
      });
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="absolute -top-12 w-full h-20 flex flex-col justify-center items-center">
      <button
        onClick={image ? () => setImage(null) : takePicture}
        className="absolute right-12 -bottom-12 z-50 h-12 w-12 rounded-full bg-red-500 text-white transform active:scale-95"
      >
        <span className="material-symbols-outlined">
          {image ? "undo" : "photo_camera"}
        </span>
      </button>
      <video
        ref={videoRef}
        className={`${
          !image
            ? "aspect-video h-40 shadow-2xl rounded-lg border border-white bg-black pt-0"
            : "hidden"
        }`}
      ></video>

      <canvas
        className={`${
          image
            ? "aspect-video h-40 shadow-2xl rounded-lg border border-white bg-black pt-0"
            : "hidden"
        }`}
        ref={photoRef}
      ></canvas>
    </div>
  );
};

export default Camera;
