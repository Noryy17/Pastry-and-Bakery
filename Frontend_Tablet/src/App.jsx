import React from 'react';
import SidebarCart from './components/SidebarCart';

function App() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Area Tengah / Kiri (Tempat Visualizer Nanti) */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-300">
          Kanvas Utama (Nanti isi visual kue di sini)
        </h1>
      </div>

      {/* Area Kanan (Panggil komponen keranjang) */}
      <SidebarCart />
    </div>
  );
}

export default App;