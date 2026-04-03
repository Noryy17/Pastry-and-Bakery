import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SidebarCart() {
  // Bikin jangkar buat GSAP
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Animasi GSAP: Laci meluncur dari luar kanan (x: '100%') ke posisi normal (x: '0%')
    gsap.fromTo(sidebarRef.current,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="fixed top-0 right-0 h-full w-[380px] bg-[#F1F5F9] shadow-2xl border-l border-gray-200 flex flex-col z-50"
    >
      {/* Header Cart */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className="text-2xl font-bold text-gray-800">Keranjang Belanja</h2>
        <p className="text-sm text-gray-500">Asri Cake POS</p>
      </div>

      {/* List Item (Sistem AutoLayout) */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        
        {/* Item 1 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-800">Risoles (Ayam Suwir)</h3>
            <p className="text-sm text-gray-500">Rp 3.500 x 5</p>
          </div>
          <p className="font-bold text-[#4F46E5]">Rp 17.500</p>
        </div>

        {/* Item 2 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-800">Lapis Surabaya</h3>
            <p className="text-sm text-gray-500">Rp 5.000 x 2</p>
          </div>
          <p className="font-bold text-[#4F46E5]">Rp 10.000</p>
        </div>

      </div>

      {/* Footer Total & Tombol Bayar */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-600">Total:</span>
          <span className="text-3xl font-bold text-gray-900">Rp 27.500</span>
        </div>
        <button className="w-full bg-[#4F46E5] text-white font-bold py-4 rounded-xl text-lg active:scale-95 hover:shadow-lg transition-all">
          BAYAR SEKARANG
        </button>
      </div>
    </div>
  );
}