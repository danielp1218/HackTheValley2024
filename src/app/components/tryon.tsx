import React from "react";
import PoseVideo from "./PoseVideo";
import { Pose } from "@mediapipe/pose";


export default function TryOn() {
    return(
        <div>
            <div className="flex flex-col w-screen justify-center border-2 border-red-600">
                <div className="flex w-full justify-center">
                    <PoseVideo/>
                </div>
                    text area
                <div>
                </div>
            </div>
        </div>
    )
  }
  