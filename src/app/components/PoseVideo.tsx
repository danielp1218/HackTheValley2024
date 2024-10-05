"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Pose } from '@mediapipe/pose';

const PoseVideo = () => {
  const videoRef = useRef(null);
  const [, setPoseResults] = useState(null);

  useEffect(() => {
    // Set up webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        });

    // Set up MediaPipe Pose
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults((results) => {
      setPoseResults(results);
    });

    // if (videoRef.current) {
    //   const sendToMediaPipe = async () => {
    //     if (videoRef.current) {
    //       await pose.send({ image: videoRef.current });
    //     }
    //     requestAnimationFrame(sendToMediaPipe);
    //   };
    //   sendToMediaPipe();
    // }

    // console.log("Here");
    return () => {
      pose.close();
    };

  }, []);

  return (
      <div>
        <video ref={videoRef} autoPlay />
      </div>
  );
};
export default PoseVideo;