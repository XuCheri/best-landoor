import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';
import { useScroll } from '@react-three/drei';

const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;

  // Perlin 2D noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec3 pos = position;
    float noise = snoise(vec2(pos.x * uFrequency + uTime, pos.z * uFrequency + uTime));
    pos.y += noise * uAmplitude;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  void main() {
    gl_FragColor = vec4(uColor, 0.7);
  }
`;

const VoiceWave = () => {
  const ref = useRef<any>();
  const { theme } = useTheme();
  const scroll = useScroll();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(theme.colors.primary) },
    uAmplitude: { value: 0.2 },
    uFrequency: { value: 0.5 },
  }), [theme.colors.primary]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
      ref.current.material.uniforms.uColor.value.set(theme.colors.primary);

      // Animate visibility based on scroll
      const sectionStart = 2 / 4;
      const sectionLength = 1 / 4;
      ref.current.visible = scroll.visible(sectionStart, sectionLength);
    }
  });

  return (
    <mesh ref={ref} position={[0, -4, -10]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[12, 4, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        wireframe={true}
      />
    </mesh>
  );
};

export default VoiceWave;
