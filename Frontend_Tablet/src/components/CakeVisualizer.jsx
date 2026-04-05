import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

// ==========================================
// 1. KOMPONEN ANIMASI LELEHAN (DRIP)
// ==========================================
const AnimatedDrip = ({ color }) => {
  const dripRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(dripRef.current,
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 1.4, ease: "elastic.out(1, 0.4)", transformOrigin: "top" }
    );
  }, [color]);

  return (
    <svg
      ref={dripRef}
      viewBox="0 0 300 100"
      className="absolute top-0 left-0 w-full z-10"
      preserveAspectRatio="none"
      style={{ height: '90px' }}
    >
      {/* Blok solid atas agar tidak ada gap */}
      <rect x="0" y="0" width="300" height="30" fill={color} />
      {/* Tetesan lelehan organik super rapi */}
      <path
        fill={color}
        d="M0,0 H300 V28 C285,28 280,55 270,65 S255,75 248,60 C242,48 238,72 230,80 S215,88 208,70 C202,55 198,78 190,85 S175,90 170,72 C165,58 161,80 153,88 S138,92 132,75 C127,62 122,84 113,90 S98,94 93,77 C88,63 83,86 74,92 S59,95 53,78 C48,64 43,87 35,93 S20,96 15,80 C10,68 5,90 0,95 Z"
      />
    </svg>
  );
};

// ==========================================
// KOMPONEN UTAMA CAKE VISUALIZER
// ==========================================

export default function CakeVisualizer({ activeSize, setActiveSize, activeFlavor, setActiveFlavor, onAddToCart }) {
  const cakeContainerRef = useRef(null);
  
  // STATE: SINGLE SELECTION (Ultra Clean)
  const [activeTopping, setActiveTopping] = useState('None');

  const flavors = {
    Strawberry: { top: '#FBCFE8', side: '#F472B6', label: 'STRAWBERRY', basePrice: 150000 },
    Chocolate:  { top: '#D4A373', side: '#A16207', label: 'CHOCOLATE',  basePrice: 160000 },
    Matcha:     { top: '#D9F99D', side: '#84CC16', label: 'MATCHA',     basePrice: 175000 },
    Vanilla:    { top: '#FEF3C7', side: '#F59E0B', label: 'VANILLA',    basePrice: 140000 },
  };

  // DATA TOPPING BERSIH (Hanya Polosan atau Drip)
  const toppings = {
    None: { name: 'Tanpa Topping', price: 0, type: 'none', thumb: '🚫' },
    ChocoDrip: { name: 'Choco Drip', price: 15000, type: 'drip', color: '#3E2008', thumb: '🍫' },
    VanillaDrip: { name: 'Vanilla Sauce', price: 12000, type: 'drip', color: '#FFF8DC', thumb: '🥛' }
  };

  const sizeMultipliers = { Small: 0.8, Medium: 1.0, Large: 1.3 };
  const currentPrice = (flavors[activeFlavor].basePrice * sizeMultipliers[activeSize]) + toppings[activeTopping].price;

  // Animasi Inisial & Resize
  useEffect(() => {
    gsap.fromTo(cakeContainerRef.current,
      { y: 50, opacity: 0, scale: 0.5 },
      { y: 0, opacity: 1, scale: sizeMultipliers[activeSize], duration: 1.2, ease: "back.out(1.5)" }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSizeChange = (size) => {
    setActiveSize(size);
    gsap.to(cakeContainerRef.current, { scale: sizeMultipliers[size], duration: 0.6, ease: "elastic.out(1, 0.6)" });
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-700">

      {/* Header Harga */}
      <div className="flex justify-between items-center pb-2 border-b-2 border-[#E0E0E0]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#264653]">Mode Custom Tart</h1>
          <p className="text-[#607D8B]">Visualisasi minimalis, elegan & presisi.</p>
        </div>
        <div className="text-right bg-white p-4 rounded-2xl shadow-sm border border-[#E0E0E0]">
          <p className="text-[10px] font-extrabold text-[#757575] tracking-widest uppercase mb-1">Total Estimasi</p>
          <p className="text-3xl font-black text-[#E76F51]">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(currentPrice)}
          </p>
        </div>
      </div>

      {/* KANVAS KUE */}
      <div className="relative w-full h-[450px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(38,70,83,0.04)] border border-[#E0E0E0] flex items-center justify-center overflow-hidden">
        <div ref={cakeContainerRef} className="relative w-[300px] h-[200px]">

          {/* ── LAYER 1: BADAN KUE (SIDE) ── */}
          <div
            className="absolute w-full transition-colors duration-500 z-10"
            style={{
              top: '60px',
              height: '120px',
              backgroundColor: flavors[activeFlavor].side,
              borderBottomLeftRadius: '50% 60px',
              borderBottomRightRadius: '50% 60px',
              boxShadow: '0 30px 50px rgba(38, 70, 83, 0.12)',
            }}
          >
            {/* Render Drip Tersembunyi (Tidak bocor ke bawah) */}
            {toppings[activeTopping].type === 'drip' && (
              <div
                className="absolute top-0 left-0 w-full pointer-events-none"
                style={{ height: '90px', overflow: 'hidden' }}
              >
                <AnimatedDrip key={activeTopping} color={toppings[activeTopping].color} />
              </div>
            )}
          </div>

          {/* ── LAYER 2: ATAS KUE (TOP ELLIPSE) ── */}
          <div
            className="absolute top-0 w-full h-[120px] transition-colors duration-500 z-20"
            style={{
              backgroundColor: flavors[activeFlavor].top,
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: 'inset 0px -4px 12px rgba(0,0,0,0.05)',
            }}
          >
            {/* Lapisan saus radial-gradient di atas kue (Sangat Realistis!) */}
            {toppings[activeTopping].type === 'drip' && (
              <div
                key={`${activeTopping}-top`}
                className="absolute inset-0 animate-in fade-in duration-500"
                style={{
                  background: `radial-gradient(ellipse at 40% 35%, ${toppings[activeTopping].color}cc, ${toppings[activeTopping].color}f0)`,
                  zIndex: 5,
                  boxShadow: 'inset 0px -6px 16px rgba(0,0,0,0.15)',
                }}
              />
            )}

            {/* Label rasa di tengah */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md text-[#264653] text-[10px] font-black px-4 py-1.5 rounded-full border border-white/50 shadow-sm uppercase tracking-widest z-30">
              {flavors[activeFlavor].label}
            </div>
          </div>

        </div>
      </div>

      {/* PANEL KONTROL */}
      <div className="flex flex-col gap-5 p-6 bg-white rounded-3xl border border-[#E0E0E0] shadow-sm">

        {/* Ukuran & Rasa */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-[#455A64] ml-2">Ukuran Kue</span>
            <div className="flex gap-2">
              {['Small', 'Medium', 'Large'].map((size) => (
                <button key={size} onClick={() => handleSizeChange(size)}
                  className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${
                    activeSize === size
                      ? 'bg-[#2A9D8F] text-white shadow-md'
                      : 'bg-[#FDFBF6] text-[#607D8B] hover:bg-[#F5F5F5] border border-[#E0E0E0]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-[#455A64] ml-2">Rasa Dasar</span>
            <select
              value={activeFlavor}
              onChange={(e) => setActiveFlavor(e.target.value)}
              className="w-full h-full bg-[#FDFBF6] text-[#264653] text-sm font-bold px-4 rounded-2xl border border-[#E0E0E0] outline-none cursor-pointer focus:border-[#2A9D8F]"
            >
              {Object.keys(flavors).map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>

        {/* Tema Topping */}
        <div className="flex flex-col gap-3 mt-2 border-t border-[#E0E0E0] pt-5">
          <span className="text-sm font-bold text-[#455A64] ml-2">Tema Custom</span>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {Object.keys(toppings).map((tKey) => {
              const t = toppings[tKey];
              const isSelected = activeTopping === tKey;
              return (
                <button key={tKey} onClick={() => setActiveTopping(tKey)}
                  className={`flex flex-col items-center justify-center min-w-[100px] p-3 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-[#2A9D8F] bg-[#E0F2F1] shadow-sm scale-105'
                      : 'border-[#E0E0E0] bg-white hover:bg-[#FDFBF6]'
                  }`}
                >
                  <span className="text-2xl mb-1">{t.thumb}</span>
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-[#2A9D8F]' : 'text-[#607D8B]'}`}>
                    {t.name}
                  </span>
                  {t.price > 0 && <span className="text-[9px] text-[#A1887F] font-bold mt-1">+{(t.price / 1000)}k</span>}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Tombol Keranjang */}
      <button
        onClick={() => {
          const toppingName = activeTopping === 'None' ? '' : ` (+ ${toppings[activeTopping].name})`;
          const itemName = `Custom Tart ${activeFlavor}${toppingName}`;
          onAddToCart({ name: itemName, size: activeSize, price: currentPrice, qty: 1 });
        }}
        className="w-full bg-[#E76F51] hover:bg-[#D65F41] text-white font-black py-4 rounded-3xl shadow-xl shadow-orange-100 transition-all active:scale-[0.98] text-lg flex justify-center items-center gap-3"
      >
        <span>➕ Masukkan Ke Pesanan Cart</span>
      </button>

    </div>
  );
}