import React from 'react';

export default function SidebarCart({ cartItems, onRemoveItem, onCheckout }) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header Cart */}
      <div className="p-7 border-b border-[#E0E0E0]">
        <h2 className="text-2xl font-extrabold text-[#264653] flex items-center gap-2">
          🛒 Pesanan Hari Ini
          <span className="bg-[#2A9D8F] text-white text-xs px-3 py-1.5 rounded-full ml-auto font-black">
            {cartItems.length} Item
          </span>
        </h2>
      </div>

      {/* Daftar Belanjaan */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <span className="text-6xl mb-4">🛍️</span>
            <p className="text-[#455A64] font-medium">Keranjang masih kosong.<br/>Pilih item di sebelah kiri untuk mulai.</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="bg-[#FDFBF6] p-4 rounded-2xl border border-[#E0E0E0] flex justify-between items-center group transition-all hover:border-[#2A9D8F] hover:shadow-sm">
              <div>
                <h3 className="font-extrabold text-[#264653] text-sm tracking-tight">{item.name}</h3>
                <p className="text-xs text-[#607D8B] mt-0.5">Ukuran: {item.size}</p>
                <p className="text-base font-black text-[#E76F51] mt-1.5">{formatRupiah(item.price)}</p>
              </div>
              <button 
                onClick={() => onRemoveItem(item.id)}
                className="w-9 h-9 rounded-full bg-white text-[#E53935] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#EF9A9A] border border-[#E0E0E0]"
                title="Hapus item"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer / Area Checkout */}
      <div className="p-7 bg-[#264653] text-white border-t border-[#E0E0E0] shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-t-3xl">
        <div className="flex justify-between items-center mb-5">
          <span className="text-[#E0F2F1]/80 font-medium">Total Harga</span>
          <span className="text-2xl font-black text-white">{formatRupiah(subtotal)}</span>
        </div>
        <button 
          onClick={onCheckout} // <--- INI TRIGGERNYA
          disabled={cartItems.length === 0}
          className="w-full bg-[#E76F51] hover:bg-[#D65F41] disabled:bg-[#455A64] disabled:text-[#B0BEC5] disabled:cursor-not-allowed text-white font-black py-4.5 rounded-2xl shadow-lg transition-all active:scale-95 text-md py-4"
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
}