'use client';
import React, {useEffect, useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera, useGLTF} from '@react-three/drei';
import {Euler, Object3D, Object3DEventMap, Quaternion} from "three";

const boneMapping = {
    'leftShoulder': 'lShldrBend',
    'rightShoulder': 'rShldrBend',
    'leftElbow': 'lForearmBend',
    'rightElbow': 'rForearmBend',
    'leftWrist': 'lHand',
    'rightWrist': 'rHand',
    'leftHip': 'lThighBend',
    'rightHip': 'rThighBend',
    'leftKnee': 'lShin',
    'rightKnee': 'rShin',
    'leftAnkle': 'lFoot',
    'rightAnkle': 'rFoot',
    'neck': 'neckLower',
    'head': 'head',
    // Add more mappings as needed
};

const Model = ({position, scale, boneOrientation}) => {
    const gltf = useGLTF('/jacket2.glb');
    const skinnedMeshRef: React.MutableRefObject<Object3D<Object3DEventMap> | undefined> = useRef();
    const bonesMap = useRef({});

    useEffect(() => {
        gltf.scene.position.set(0,0,0);
        console.log(boneOrientation)
        gltf.scene.traverse((child) => {
            if (child.isSkinnedMesh) {
                skinnedMeshRef.current = child;
                child.skeleton.bones.forEach(bone => {
                    bonesMap.current[bone.name] = bone;
                });
                return;
            }
        });
    }, [gltf]);
    useFrame(() => {
        if (skinnedMeshRef.current && boneOrientation) {
            Object.entries(boneOrientation.poseOrientation).forEach(([mediaPipeBoneName, orientation]) => {
                console.log(mediaPipeBoneName, orientation);
                const modelBoneName = boneMapping[mediaPipeBoneName];
                if (modelBoneName) {
                    const bone = bonesMap.current[modelBoneName];
                    if (bone) {
                        // Convert the orientation to Euler angles
                        const euler = new Euler().setFromQuaternion(
                            new Quaternion(orientation.x, orientation.y, orientation.z, orientation.w)
                        );

                        // Apply the rotation to the bone
                        bone.rotation.set(
                            euler.x,
                            euler.y,
                            euler.z,
                            'XYZ'
                        );
                    }
                }
            });
        }
    });
    return (
        <mesh position={position} scale={scale}>
            <primitive object={gltf.scene} />
        </mesh>
    );

}

const ClothingModel = ({position, boneOrientation}) => {
    return (
        <Canvas>
            <OrbitControls />
            <directionalLight position={[0,0,15]}/>
            <Model position={position} scale={[1,1,1]} boneOrientation={boneOrientation}/>
            <PerspectiveCamera
                makeDefault
                fov={90}
                near={0.1}
                far={150}
                position={[0, 10, 20]}
            />
        </Canvas>
    );
};

export default ClothingModel;