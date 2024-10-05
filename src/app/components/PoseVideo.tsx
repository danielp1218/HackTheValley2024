
import React, { useRef, useEffect, useState} from 'react';
import { Pose, Results} from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

import ClothingModel from './ClothingModel';

const PoseVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [poseLandmarks, setPoseLandmarks] = useState<Array<{ x: number; y: number; z: number }> | null>(null);
  let camera: Camera | null = null;

  useEffect(() => {
    if (typeof window !== 'undefined' && videoRef.current && canvasRef.current) {
      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext('2d');

      if (!canvasCtx) return;

      // Initialize Pose model
      const pose = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      // Pose model results callback
      pose.onResults((results: Results) => {
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // Draw the video frame
        canvasCtx.drawImage(
          results.image,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        // If pose landmarks are detected RAWR THEY FINALLY DTECTING R U GUYS PROUD
        if (results.poseLandmarks) {
          // drawLandmarks(results.poseLandmarks, canvasCtx, canvasElement);
          console.log(results.poseLandmarks);
          console.log(results);
          setPoseLandmarks(results.poseLandmarks);
        }
      });

      // Initialize and start camera
      if (!camera && videoElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        camera = new Camera(videoElement, {
          onFrame: async () => {
            await pose.send({image: videoElement});
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    }
  }, []);

  // DRAWING LANDMARKS AS THE RED DOTS FOR TESTING :D
  // const drawLandmarks = (
  //   poseLandmarks: Array<{ x: number; y: number; z: number }>,
  //   canvasCtx: CanvasRenderingContext2D,
  //   canvasElement: HTMLCanvasElement
  // ) => {
  //   poseLandmarks.forEach((landmark) => {
  //     const x = landmark.x * canvasElement.width;
  //     const y = landmark.y * canvasElement.height;

  //     canvasCtx.beginPath();
  //     canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
  //     canvasCtx.fillStyle = 'red';
  //     canvasCtx.fill();
  //   });
  // };

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }}></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
      <ClothingModel position={[0, 0, 0]} boneOrientation={poseLandmarks} />
    </div>
  );
};

export default PoseVideo;