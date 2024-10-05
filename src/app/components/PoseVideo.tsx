// "use client";
// import React, { useRef, useEffect, useState } from 'react';
// import { Pose } from '@mediapipe/pose';


// const PoseVideo = () => {
//   const videoRef = useRef(null);
//   const [, setPoseResults] = useState(null);

//   useEffect(() => {
//     // Set up webcam
//     navigator.mediaDevices.getUserMedia({ video: true })
//         .then((stream) => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         });

//     // Set up MediaPipe Pose
//     const pose = new Pose({
//       locateFile: (file) => {
//         return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
//       }
//     });

//     pose.setOptions({
//       runningMode: "VIDEO",
//       modelComplexity: 1,
//       smoothLandmarks: true,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5
//     });

//     pose.onResults((results) => {
//       setPoseResults(results);
//     });

//     if (videoRef.current) {
//       const sendToMediaPipe = async () => {
//         try {
//           if (videoRef.current) {
//             await pose.send({ image: videoRef.current }); // Send current video frame to MediaPipe
//           }
//         } catch (error) {
//           console.error("Error sending frame to MediaPipe:", error);
//         }
    
//         // Continue processing the next frame
//         requestAnimationFrame(sendToMediaPipe);
//       };
    
//       sendToMediaPipe(); // Start the loop
//     }

//     // console.log("Here");
//     return () => {
//       // console.log("RAWR", results.poseLandmarks)
//       pose.close();
//     };

//   }, []);

//   return (
//       <div>
//         <video ref={videoRef} autoPlay />
//       </div>
//   );
// };
// export default PoseVideo;

import React, { useRef, useEffect } from 'react';
import { Pose, Results} from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

const PoseVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
    </div>
  );
};

export default PoseVideo;