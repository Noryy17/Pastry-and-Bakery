import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SidebarCart() {
  const sidebarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sidebarRef.current,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="h-full w-[380px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.05)] border-l border-gray-100 flex flex-col z-50 shrink-0"
    >
      {/* Header Cart */}
      <div className="p-6 border-b border-gray-100 bg-white z-10 relative">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Keranjang</h2>
        <p className="text-sm text-gray-500 mt-1 font-medium">Order #001 - Kasir: Dain</p>
      </div>

      {/* List Item */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-gray-50/50">
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex justify-between items-center hover:shadow-lg transition-all hover:border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-800">Risoles (Ayam)</h3>
            <p className="text-sm text-gray-500 font-medium">Rp 3.500 x 5</p>
          </div>
          <p className="font-bold text-[#4F46E5]">Rp 17.500</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex justify-between items-center hover:shadow-lg transition-all hover:border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-800">Lapis Surabaya</h3>
            <p className="text-sm text-gray-500 font-medium">Rp 5.000 x 2</p>
          </div>
          <p className="font-bold text-[#4F46E5]">Rp 10.000</p>
        </div>
      </div>

      {/* Footer Total */}
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-500">Total Tagihan</span>
          <span className="text-3xl font-bold text-gray-900 tracking-tight">Rp 27.500</span>
        </div>
        <button className="w-full bg-[#4F46E5] text-white font-bold py-4 rounded-xl text-lg hover:bg-[#4338CA] active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/30">
          BAYAR SEKARANG
        </button>
      </div>
    </div>
  );
}