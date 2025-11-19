import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import Card from './Card';

const features = [
  {
    title: "互动学习",
    description: "与 AI 导师实时对话。练习发音并获得即时反馈。",
    position: new THREE.Vector3(-3.0, 0, 0), // Increased spacing
    rotation: [0, Math.PI / 12, 0],
  },
  {
    title: "个性化学习路径",
    description: "我们的 AI 分析您的技能，为您量身定制学习计划。",
    position: new THREE.Vector3(0, 0, 0),
    rotation: [0, 0, 0],
  },
  {
    title: "知识图谱",
    description: "通过可视化方式探索单词和概念之间的联系，加深理解。",
    position: new THREE.Vector3(3.0, 0, 0), // Increased spacing
    rotation: [0, -Math.PI / 12, 0],
  },
];

const FeatureCards = () => {
  const groupRef = useRef<any>();
  const scroll = useScroll();

  useFrame(() => {
    if (groupRef.current) {
      // Define the scroll section for the feature cards (middle third)
      const sectionStart = 1 / 3;
      const sectionLength = 1 / 3;

      // Use scroll.visible to efficiently toggle visibility
      groupRef.current.visible = scroll.visible(sectionStart, sectionLength);

      // Use scroll.curve to get a 0 -> 1 -> 0 animation progress
      const curve = scroll.curve(sectionStart, sectionLength);

      // Animate the group's y position to slide in and out
      groupRef.current.position.y = (1 - curve) * 8; // Animate from y=8 down to y=0
    }
  });

  return (
    <group ref={groupRef} position={[1, 0, -8]}>
      {features.map((feature, index) => (
        <Card 
          key={index}
          position={feature.position}
          rotation={feature.rotation}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </group>
  );
};

export default FeatureCards;