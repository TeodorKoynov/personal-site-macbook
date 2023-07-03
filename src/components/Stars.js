"use client";

import {useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {PointMaterial, Points, Preload} from "@react-three/drei";
import * as random from 'maath/random/dist/maath-random.esm'
import * as buffer from "maath/buffer";
import * as misc from "maath/misc";
import {Quaternion, Vector3} from "three";

const rotationAxis = new Vector3(0, 1, 0).normalize();
const q = new Quaternion();

export const Stars = (props) => {
    const ref = useRef();

    const [{box, sphere, final}] = useState(() => {
        const box = random.inBox(new Float32Array(5000), {sides: [0.2, 0.2, 0.2]});
        const sphere = random.inSphere(box.slice(0), {radius: 0.25});
        const final = box.slice(0); // final buffer that will be used for the points mesh

        return {box, sphere, final}
    })

    // const sphere = random.inSphere(new Float32Array(4000), {radius: 0.2, amplitude: 200})

    useFrame(({clock}) => {
        const et = clock.getElapsedTime();
        const t = misc.remap(Math.sin(et), [-1, 1], [0, 1]);
        const t2 = misc.remap(Math.cos(et * 1), [-1, 1], [0, 1]);

        buffer.rotate(box, {
            q: q.setFromAxisAngle(rotationAxis, t2 * 0.1),
        });

        buffer.lerp(box, sphere, final, t);
    })

    return (
        <group position={[-2, 1.1, -1.4]}
               rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={final} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent={true}
                    color={"#f272c8"}
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}
