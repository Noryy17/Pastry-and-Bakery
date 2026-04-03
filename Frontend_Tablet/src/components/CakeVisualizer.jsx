import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export default function CakeVisualizer() {
  const cakeContainerRef = useRef(null); // Ref untuk seluruh objek kue
  const [activeSize, setActiveSize] = useState('Medium');
  const [activeFlavor, setActiveFlavor] = useState('Matcha');

  // Daftar Rasa & Warna Perspektif (HEX Premium)
  // 'top' untuk sisi atas (terang), 'side' untuk dinding samping (gelap/shadow)
  const flavors = {
    Chocolate: { 
      top: 'linear-gradient(135deg, #6F4E37 0%, #4B2C20 100%)', 
      side: 'linear-gradient(to bottom, #4B2C20 0%, #2D1810 100%)',
      label: 'DARK CHOCO', heart: '🍫'
    },
    Strawberry: { 
      top: 'linear-gradient(135deg, #FBCFE8 0%, #F472B6 100%)', 
      side: 'linear-gradient(to bottom, #F472B6 0%, #BE185D 100%)',
      label: 'SWEET BERRY', heart: '🍓'
    },
    Matcha: { 
      top: 'linear-gradient(135deg, #D9F99D 0%, #84CC16 100%)', 
      side: 'linear-gradient(to bottom, #84CC16 0%, #4D7C0F 100%)',
      label: 'PREMIUM MATCHA', heart: '🍵'
    },
    Vanilla: { 
      top: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', 
      side: 'linear-gradient(to bottom, #FEF3C7 0%, #F59E0B 100%)',
      label: 'CLASSIC VANILLA', heart: '🍦'
    },
  };

  // GSAP: Animasi masuk (Scale + Bounce)
  useEffect(() => {
    gsap.fromTo(cakeContainerRef.current,
      { y: 50, opacity: 0, scale: 0.5 }, 
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
    );
  }, []);

  // GSAP: Efek membal saat ganti ukuran (Animasikan seluruh container)
  const changeSize = (size, scaleValue) => {
    setActiveSize(size);
    gsap.to(cakeContainerRef.current, {
      scale: scaleValue,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] flex flex-col items-center justify-center relative overflow-hidden font-sans antialiased">
      
      {/* Header Info */}
      <div className="absolute top-8 left-8 z-30">
        <h1 className="text-4xl font-bold text-[#1E293B] tracking-tight">Asri Cake Visualizer</h1>
        <p className="text-[#64748B] mt-2 font-medium">Atur ukuran dan rasa dasar untuk kue kustom Dain</p>
      </div>

      {/* Kanvas Utama dengan Perspektif CSS */}
      <div className="relative w-[600px] h-[500px] flex items-center justify-center [perspective:1000px]">
        
        {/* Shadow Lantai (Halus) */}
        <div className="absolute bottom-20 w-[300px] h-[40px] bg-black/10 rounded-full blur-2xl z-0"></div>
        
        {/* Container Utama Kue (Objek yang dianimasikan GSAP) */}
        <div ref={cakeContainerRef} className="relative w-[320px] h-[280px] flex items-center justify-center z-10 [transform-style:preserve-3d]">
          
          {/* LAYER 1: SISI SAMPING/DINDING KUE (Pseudo-3D Depth) */}
          <div 
            style={{ background: flavors[activeFlavor].side }}
            className="absolute top-[60px] w-full h-[180px] rounded-b-[160px/80px] shadow-[0_15px_30px_rgba(0,0,0,0.2)] z-10"
          ></div>

          {/* LAYER 2: SISI ATAS KUE (Elips Perspektif) */}
          <div 
            style={{ background: flavors[activeFlavor].top }}
            className="absolute top-0 w-full h-[120px] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-b-4 border-black/10 flex items-center justify-center z-20"
          >
            {/* Label Rasa Glassmorphism - MIRIP TARGET */}
            <div className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-inner">
              <span className="text-white font-bold text-[11px] tracking-[0.25em] mix-blend-overlay uppercase">{flavors[activeFlavor].label}</span>
              <span className="text-white/70 text-lg mix-blend-overlay">{flavors[activeFlavor].heart}</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Control Panel (Flavor & Size Selector) */}
      <div className="absolute bottom-10 flex flex-col items-center gap-6 z-30">
        
        {/* Flavor Selector (Premium Chips) */}
        <div className="flex gap-3 p-3 bg-white rounded-2xl shadow-sm border border-[#E2E8F0]">
          {Object.keys(flavors).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFlavor(f)}
              className={`w-12 h-12 rounded-xl border-4 transition-all duration-300 active:scale-95 ${activeFlavor === f ? 'border-indigo-600 scale-110 shadow-lg' : 'border-transparent hover:border-gray-100'}`}
              style={{ background: flavors[f].side }}
              title={f}
            />
          ))}
        </div>

        {/* Size Selector */}
        <div className="flex gap-4 p-2 bg-white rounded-2xl shadow-lg border border-[#E2E8F0]">
          {['Small', 'Medium', 'Large'].map((size) => (
            <button 
              key={size}
              onClick={() => changeSize(size, size === 'Small' ? 0.8 : size === 'Large' ? 1.2 : 1)}
              className={`px-10 py-3 rounded-xl font-bold transition-all ${activeSize === size ? 'bg-[#4F46E5] text-white' : 'text-[#64748B] hover:bg-gray-50'}`}
            >
              {size} ( {size === 'Small' ? '16cm' : size === 'Large' ? '24cm' : '20cm'} )
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}