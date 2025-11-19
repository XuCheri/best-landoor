import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { Scroll, ScrollControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import Scene from './components/Scene';
import ThemeSwitcher from './components/ThemeSwitcher';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SpeechInteractionUI from './components/SpeechInteractionUI'; // New import

function App() {
  return (
    <>
      {/* Leva for GUI controls, hidden by default */}
      <Leva hidden />
      
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <ScrollControls pages={4.5} damping={0.1}>
            {/* 3D Scene */}
            <Scene />

            {/* HTML Overlay */}
            <Scroll html style={{ width: '100%' }}>
              <ThemeSwitcher />
              
              {/* Section 1: Hero */}
              <motion.div 
                className="w-screen h-screen p-8 flex flex-col justify-center items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
              >
                <h1 
                  className="text-5xl md:text-7xl font-bold" 
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  AI 英语学习门户
                </h1>
                <p className="text-xl md:text-2xl mt-4">下一代英语学习平台</p>
              </motion.div>

              {/* Section 2: 功能 */}
              <div className="w-screen h-screen p-8 flex flex-col justify-center items-center">
                <h2 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-primary)' }}>
                  探索未来
                </h2>
              </div>

              {/* Section 3: 语音交互 */}
              <div className="w-screen h-screen p-8 flex flex-col justify-center items-center">
                <SpeechInteractionUI />
              </div>

              {/* Section 4: 用户评价 */}
              <div className="w-screen h-screen p-8 flex flex-col justify-center items-center">
                <Testimonials />
              </div>

              {/* 页脚 */}
              <Footer />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
}

export default App;
