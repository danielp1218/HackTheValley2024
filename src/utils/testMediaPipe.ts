export const tPoseMediaPipeData = {
    timestamp: 1234567890,
    poseWorldLandmarks: [
        // Array of 3D coordinates for each landmark (not included for brevity)
    ],
    poseOrientation: {
        // Quaternions for key joints in T-pose
        nose: { x: 0, y: 0, z: 0, w: 1 }, // Neutral position
        leftShoulder: { x: 0, y: 0.7071068, z: 0, w: 0.7071068 }, // Rotated 90 degrees around Y-axis
        rightShoulder: { x: 0, y: -0.7071068, z: 0, w: 0.7071068 }, // Rotated -90 degrees around Y-axis
        leftElbow: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        rightElbow: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        leftWrist: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        rightWrist: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        leftHip: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        rightHip: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        leftKnee: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        rightKnee: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        leftAnkle: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        rightAnkle: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        leftEye: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        rightEye: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        leftEar: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        rightEar: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        neck: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
        head: { x: 0, y: 0, z: 0, w: 1 }, // Neutral
    }
};


// Function to get a new pose with some randomness
export function getRandomizedPose() {
    const newPose = JSON.parse(JSON.stringify(tPoseMediaPipeData));

    Object.keys(newPose.poseOrientation).forEach(joint => {
        ['x', 'y', 'z'].forEach(axis => {
            newPose.poseOrientation[joint][axis] += (Math.random() - 0.5) * 0.1;
        });
        // Normalize the quaternion
        const magnitude = Math.sqrt(
            newPose.poseOrientation[joint].x ** 2 +
            newPose.poseOrientation[joint].y ** 2 +
            newPose.poseOrientation[joint].z ** 2 +
            newPose.poseOrientation[joint].w ** 2
        );
        ['x', 'y', 'z', 'w'].forEach(component => {
            newPose.poseOrientation[joint][component] /= magnitude;
        });
    });

    return newPose;
}
