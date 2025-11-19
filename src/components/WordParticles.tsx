import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// A list of words related to the theme
const words = ["hello", "fluent", "improve", "learn", "AI", "future", "speak", "listen", "read", "write", "progress", "vocabulary", "grammar"];

// A single word particle component that manages its own state and animation
function Word({ position, children }) {
  const ref = useRef<any>();

  // Store original position for returning after mouse interaction
  const originalPosition = useMemo(() => new THREE.Vector3().copy(position), []);
  
  // Memoize a random factor for unique animation per particle
  const randomFactor = useMemo(() => 0.5 + Math.random() * 0.5, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Create a 3D vector for the mouse pointer in the viewport space
      const pointerPos = new THREE.Vector3(state.pointer.x * state.viewport.width / 2, state.pointer.y * state.viewport.height / 2, 0);
      
      // Calculate distance from the particle to the mouse pointer
      const distance = ref.current.position.distanceTo(pointerPos);

      // Calculate a repulsive force based on distance (stronger when closer)
      const force = Math.max(0, 1 - distance / 3); 

      // Calculate the target position by pushing the particle away from the mouse
      const targetPosition = originalPosition.clone().add(
        ref.current.position.clone().sub(pointerPos).normalize().multiplyScalar(force * 1.2)
      );

      // Smoothly interpolate the particle's position towards the target
      ref.current.position.lerp(targetPosition, delta * 4);

      // Add a slow, constant floating animation
      ref.current.position.y += Math.sin(state.clock.elapsedTime * randomFactor) * delta * 0.3;
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.25}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </Text>
  );
}

// The main component to generate the cloud of words
const WordParticles = ({ count = 80 }) => {
  const positions = useMemo(() => {
    const temp = [];
    const sphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 8);
    for (let i = 0; i < count; i++) {
      const pos = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(sphere.radius * 1.5),
        THREE.MathUtils.randFloatSpread(sphere.radius * 1.5),
        THREE.MathUtils.randFloatSpread(sphere.radius * 1.5)
      );
      temp.push(pos);
    }
    return temp;
  }, [count]);

  return (
    <group>
      {positions.map((pos, i) => (
        <Word key={i} position={pos}>
          {words[i % words.length]}
        </Word>
      ))}
    </group>
  );
};

export default WordParticles;
