import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

const Card = ({ position, rotation: initialRotation = [0, 0, 0], title, description }) => {
  const ref = useRef<any>();
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  useFrame((state, delta) => {
    if (ref.current) {
      // Create a target quaternion based on hover state
      const targetQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          isHovered ? state.pointer.y * 0.2 : 0,
          isHovered ? -state.pointer.x * 0.2 : 0,
          0
        )
      );

      // Smoothly interpolate the group's quaternion towards the target
      ref.current.quaternion.slerp(targetQuaternion, delta * 8);
    }
  });

  return (
    <group ref={ref} position={position} rotation={initialRotation}>
      <RoundedBox
        args={[2.5, 3.5, 0.1]} // width, height, depth
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.15} 
          emissive={theme.colors.primary}
          emissiveIntensity={isHovered ? 0.3 : 0.15}
          roughness={0.1}
          metalness={0.1}
        />
      </RoundedBox>
      <Text
        position={[0, 1.0, 0.1]}
        fontSize={0.25}
        color={theme.colors.accent}
        anchorX="center"
      >
        {title}
      </Text>
      <Text
        position={[0, -0.2, 0.1]}
        fontSize={0.12}
        color={theme.colors.text}
        maxWidth={2.0}
        lineHeight={1.5}
        textAlign="center"
        anchorX="center"
      >
        {description}
      </Text>
    </group>
  );
};

export default Card;