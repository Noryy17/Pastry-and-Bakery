import React from 'react';
import SidebarCart from './components/SidebarCart';
import CakeVisualizer from './components/CakeVisualizer';

function App() {
  return (
    <div className="h-screen w-full bg-white flex overflow-hidden font-sans">
      
      {/* Area Tengah: Kanvas Custom Cake */}
      <CakeVisualizer />

      {/* Area Kanan: Keranjang Belanja */}
      <SidebarCart />
      
    </div>
  );
}

export default App;