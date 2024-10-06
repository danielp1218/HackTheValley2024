'use client';
import React, {useEffect, useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {PerspectiveCamera, useGLTF} from '@react-three/drei';
import {Object3D, Object3DEventMap} from "three";

//const boneSet = new Set([
//    'lShldrBend', 'rShldrBend', 'lForearmBend', 'rForearmBend', 'lHand', 'rHand', 'lThighBend', 'rThighBend', 'head'
//]);

const boneMapping = {
    11: 'lShldrBend', // left shoulder
    12: 'rShldrBend', // right shoulder
    13: 'lForearmBend', // left elbow
    14: 'rForearmBend', // right elbow
    15: 'lHand', // left wrist
    16: 'rHand', // right wrist
    23: 'lThighBend', // left hip
    24: 'rThighBend', // right hip
    0: 'head', // nose (we'll use this for head orientation)
    // Add more mappings as needed
};


const Model = ({position, scale, poseData}) => {
    const gltf = useGLTF('/jacket2.glb');
    const skinnedMeshRef: React.MutableRefObject<Object3D<Object3DEventMap> | undefined> = useRef();
    const bonesMap = useRef({});
    const [pos, setPos] = useState(position);

    /*useEffect(() => {
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.traverse((child) => {
            if (child.isSkinnedMesh && child.skeleton) {
                skinnedMeshRef.current = child;

                // Create new arrays for bones and inverses
                const newBones = [];
                const newBoneInverses = [];

                child.skeleton.bones.forEach((bone, index) => {
                    if (bone && bone.name && boneSet.has(bone.name)) {
                        newBones.push(bone);
                        newBoneInverses.push(child.skeleton.boneInverses[index].clone());
                        bonesMap.current[bone.name] = bone;
                    }
                });

                // Create a new Skeleton instance
                const newSkeleton = new THREE.Skeleton(newBones, newBoneInverses);

                // Create a new BufferGeometry
                const newGeometry = new THREE.BufferGeometry();

                // Copy attributes from the original geometry
                Object.keys(child.geometry.attributes).forEach(key => {
                    newGeometry.setAttribute(key, child.geometry.attributes[key].clone());
                });

                // Update skinIndices
                if (newGeometry.attributes.skinIndex) {
                    const oldToNewIndex = new Map();
                    newBones.forEach((bone, index) => {
                        oldToNewIndex.set(child.skeleton.bones.indexOf(bone), index);
                    });

                    const skinIndexAttr = newGeometry.attributes.skinIndex;
                    const skinIndexArray = skinIndexAttr.array;

                    for (let i = 0; i < skinIndexArray.length; i++) {
                        const oldIndex = skinIndexArray[i];
                        skinIndexArray[i] = oldToNewIndex.has(oldIndex) ? oldToNewIndex.get(oldIndex) : 0;
                    }

                    skinIndexAttr.needsUpdate = true;
                }

                // Create a new SkinnedMesh with the new geometry and skeleton
                const newSkinnedMesh = new THREE.SkinnedMesh(newGeometry, child.material);
                newSkinnedMesh.skeleton = newSkeleton;
                newSkinnedMesh.bindMatrix.copy(child.bindMatrix);
                newSkinnedMesh.bindMatrixInverse.copy(child.bindMatrixInverse);

                // Replace the old SkinnedMesh with the new one
                child.parent.add(newSkinnedMesh);
                child.parent.remove(child);

                // Update the skinnedMeshRef
                skinnedMeshRef.current = newSkinnedMesh;

            }
        });
    }, [gltf]);*/

    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.isSkinnedMesh) {
                skinnedMeshRef.current = child;
                child.skeleton.bones.forEach(bone => {
                    console.log(bone.name);
                    bonesMap.current[bone.name] = bone;
                });
                return;
            }
        });
    }, [gltf]);


    useFrame(() => {
        if (skinnedMeshRef.current && poseData && poseData.length >= 33) {

            let avgX = 0;
            let avgY = 0;
            let length = 0;
            Object.entries(boneMapping).forEach(([index, modelBoneName]) => {
                const bone = bonesMap.current[modelBoneName];
                if (bone) {
                    const i = parseInt(index);
                    const landmark = poseData[i];

                    // Set the bone's position
                    //.position.set(-320+landmark.x*640, 240-landmark.y*480, 0);
                    avgX += landmark.x;
                    avgY += landmark.y;
                    ++length;
                }
            });
            if(length > 0){
                const avg = [avgX/length, avgY/length];
                setPos ( [-320 + avg[0] * 640, 240 - avg[1] * 480, 15]);
                console.log(avg);
            } else return;

        }
    });
    return (
        <mesh position={pos} scale={scale}>
            <primitive object={gltf.scene} />
        </mesh>
    );

}

const ClothingModel = ({position, poseData}) => {
    return (
        <Canvas>
            <directionalLight position={position}/>
            <Model position={[0,0,0]} scale={2} poseData={poseData}/>
            <PerspectiveCamera
                makeDefault
                fov={90}
                near={0.1}
                far={150}
                position={[0,0,15]}
            />
        </Canvas>
    );
};

export default ClothingModel;