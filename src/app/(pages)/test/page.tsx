"use client";
import ClothingModel from "@/app/components/ClothingModel";
import {getRandomizedPose,tPoseMediaPipeData} from "@/utils/testMediaPipe";
import {useEffect, useState} from "react";
const Test = () => {
    const [pose , setPose] = useState(getRandomizedPose());

    useEffect(() => {
        //setInterval(() => setPose(getRandomizedPose()), 2000);
    }, []);
    return (
        <div className="h-screen">
            <ClothingModel position={[0,0,0]} boneOrientation={tPoseMediaPipeData}/>
        </div>
    );
}

export default Test;