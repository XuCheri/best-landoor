import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full p-8 mt-16 flex justify-center items-center text-center bg-black/20 backdrop-blur-md border-t border-white/10">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-primary)' }}>产品</h3>
            <ul className="text-white/70">
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">功能</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">定价</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">演示</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-primary)' }}>公司</h3>
            <ul className="text-white/70">
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">职业发展</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-primary)' }}>资源</h3>
            <ul className="text-white/70">
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">博客</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">支持</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-primary)' }}>关注我们</h3>
            <div className="flex gap-4">
              {/* Replace with actual icons later */}
              <a href="#" className="hover:text-white transition-colors text-xl">X</a>
              <a href="#" className="hover:text-white transition-colors text-xl">LI</a>
              <a href="#" className="hover:text-white transition-colors text-xl">GH</a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-white/50">
          <p>&copy; {new Date().getFullYear()} AI 英语学习门户。保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
