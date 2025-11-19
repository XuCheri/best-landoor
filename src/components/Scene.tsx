import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useTheme } from '../contexts/ThemeContext';

import VoiceWave from './VoiceWave';
import FeatureCards from './FeatureCards';
import WordParticles from './WordParticles';

const Scene = () => {
  const scroll = useScroll();
  const { theme } = useTheme();

  useFrame((state, delta) => {
    // The offset is between 0 and 1, reflecting the scroll position.
    const offset = scroll.offset;

    // Animate camera position based on scroll
    state.camera.position.z = 5 - offset * 16; // Adjusted for more depth with more pages
    
    // You can also animate other properties, for example, camera rotation or object positions
    state.camera.rotation.y = -offset * Math.PI * 0.1;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <spotLight 
        position={[0, 10, 0]} 
        intensity={0.8} 
        penumbra={1} 
        angle={0.3} 
        color={theme.colors.primary} 
      />

      {/* Word particle system */}
      <WordParticles />

      {/* 3D Feature Cards */}
      <FeatureCards />

      {/* 3D Voice Wave */}
      <VoiceWave />

      {/* Post-processing Effects */}
      <EffectComposer>
        <Bloom 
          intensity={0.6} 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.9} 
          height={300}
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};

export default Scene;
