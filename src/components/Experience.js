"use client"

import {
    OrbitControls,
    Environment,
    PresentationControls,
    Float,
    Html,
    useGLTF,
    Text,
    ContactShadows
} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {useRef} from "react";
import {Stars} from "@/components/Stars";


const Experience = () => {
    const macbook = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');

    const textRef = useRef();

    return (
        <>
            <color args={['#050816']} attach={"background"}/>

            <Environment preset="city"/>

            <PresentationControls
                global
                rotation={[0.13, 0, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}

                config={{
                    damping: 0.1,
                    mass: 1,
                    stiffness: 100,
                    overshootClamping: true,
                    restSpeedThreshold: 0.01,
                    restDisplacementThreshold: 0.01,
                }}
                // config={{ mass: 2, tension: 400}}
                snap={{mass: 4, tenstion: 400}}
            >
                <Float rotationIntensity={0.4}>
                    <rectAreaLight
                        width={2.5}
                        height={1.65}
                        intensity={5}
                        color={'#915eff'}
                        rotation={[-0.1, Math.PI, 0]}
                        position={[0, 0.55, -1.15]}
                    />

                    <primitive object={macbook.scene} position-y={-1.45}>
                        <Html
                            transform
                            wrapperClass={"htmlScreen"}
                            distanceFactor={1.17}
                            position={[0, 1.56, -1.4]}
                            rotation-x={-0.256}
                        >
                            <iframe src={"https://portfolio-site-teodorkoynov.vercel.app/"}/>
                        </Html>
                    </primitive>
                    <Text
                        ref={textRef}
                        fontSize={0.75}
                        position={[-2, 0.1, -1.5]}
                        rotation-y={Math.PI / 8}
                        rotation-z={Math.PI / 2}
                        // maxWidth={2}
                        outlineColor={'#fff'}

                    >
                        Web
                    </Text>
                    <Stars/>

                </Float>

            </PresentationControls>

            <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4}/>

        </>
    )
}

const ExperienceCanvas = () => {
    return (
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [0, 1.5, 4]
            }}
        >
            <Experience/>
        </Canvas>
    )
}

export default ExperienceCanvas;