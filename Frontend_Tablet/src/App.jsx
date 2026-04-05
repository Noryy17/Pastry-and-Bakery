import React, { useState } from 'react';
import SidebarNavigation from './components/SidebarNavigation';
import CakeVisualizer from './components/CakeVisualizer';
import SidebarCart from './components/SidebarCart';
import CheckoutModal from './components/CheckoutModal'; // IMPORT MODAL BARU

export default function App() {
  const [activeMenu, setActiveMenu] = useState('Custom Tart');
  const [cartItems, setCartItems] = useState([]);
  
  // STATE BARU UNTUK MODAL CHECKOUT
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [activeSize, setActiveSize] = useState('Medium');
  const [activeFlavor, setActiveFlavor] = useState('Strawberry');

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, { ...item, id: Date.now() }]);
  };

  const handleRemoveItem = (idToRemove) => {
    setCartItems(cartItems.filter(item => item.id !== idToRemove));
  };

  // FUNGSI SAAT PEMBAYARAN SUKSES
  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false); // Tutup Modal
    setCartItems([]); // Kosongkan Keranjang
    // Disini nanti kamu bisa nambahin alert/toast sukses kalau mau
    alert('✅ Transaksi Berhasil! Struk sedang dicetak...');
  };

  const renderMainContent = () => {
    switch (activeMenu) {
      case 'Custom Tart':
        return (
          <CakeVisualizer 
            activeSize={activeSize} setActiveSize={setActiveSize}
            activeFlavor={activeFlavor} setActiveFlavor={setActiveFlavor}
            onAddToCart={handleAddToCart}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-[#455A64]">
            <h2 className="text-3xl font-extrabold text-[#264653]">Mode {activeMenu}</h2>
            <p className="mt-2 text-lg">Halaman ini sedang dalam tahap persiapan.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#FEFBF3] overflow-hidden font-sans antialiased text-[#264653]">
      <SidebarNavigation activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 flex flex-col relative z-0">
        <header className="h-16 bg-white border-b border-[#E0E0E0] flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#757575]">Sesi Kasir:</span>
            <span className="font-bold text-[#2A9D8F]">Kasir-01 (Admin)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[#757575]">Tanggal:</span>
            <span className="font-bold">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 flex flex-col items-center bg-[#FDFBF6]">
          <div className="w-full max-w-5xl h-full">
            {renderMainContent()}
          </div>
        </main>
      </div>

      <aside className="w-[380px] flex-shrink-0 bg-white shadow-[-10px_0_30px_rgba(38,70,83,0.03)] z-10">
        <SidebarCart 
          cartItems={cartItems} 
          onRemoveItem={handleRemoveItem} 
          onCheckout={() => setIsCheckoutOpen(true)} // BUKA MODAL SAAT DIKLIK
        />
      </aside>

      {/* RENDER MODAL CHECKOUT DI LAPISAN PALING ATAS */}
      {isCheckoutOpen && (
        <CheckoutModal 
          cartItems={cartItems} 
          onClose={() => setIsCheckoutOpen(false)} 
          onSuccess={handlePaymentSuccess} 
        />
      )}
    </div>
  );
}