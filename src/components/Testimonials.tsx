import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "这个平台彻底改变了我的学习过程。AI 反馈的洞察力令人难以置信！",
    author: "Alex Johnson",
    title: "软件工程师",
  },
  {
    quote: "我终于在会议中自信地说英语了。实时对话练习是颠覆性的。",
    author: "Maria Garcia",
    title: "产品经理",
  },
  {
    quote: "通过知识图谱的可视化词汇学习方法，让我前所未有地记住了单词。",
    author: "Chen Wei",
    title: "用户体验设计师",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-3xl text-center flex flex-col items-center" style={{ height: '200px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute flex flex-col items-center"
        >
          <p className="text-xl md:text-2xl italic">"{testimonials[index].quote}"</p>
          <p className="mt-6 text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
            {testimonials[index].author}
          </p>
          <p className="text-md text-white/70">{testimonials[index].title}</p>
        </motion.div>
      </AnimatePresence>
      <div className="absolute -bottom-12 w-full flex justify-center gap-16">
        <button 
          onClick={prevTestimonial} 
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-lg leading-none"
          aria-label="上一条评价"
        >
          &#x2190;
        </button>
        <button 
          onClick={nextTestimonial} 
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-lg leading-none"
          aria-label="下一条评价"
        >
          &#x2192;
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
