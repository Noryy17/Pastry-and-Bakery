import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CheckoutModal({ cartItems, onClose, onSuccess }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [cashAmount, setCashAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Kalkulasi Total
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const parsedCash = parseInt(cashAmount.replace(/[^0-9]/g, ''), 10) || 0;
  const change = parsedCash - total;

  const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

  // Animasi Muncul
  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modalRef.current, 
      { y: 50, opacity: 0, scale: 0.95 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" }
    );
  }, []);

  // Animasi Tutup & Eksekusi Sukses
  const handleSuccess = () => {
    setIsProcessing(true);
    // Simulasi loading 1 detik biar kerasa "nyata"
    setTimeout(() => {
      gsap.to(modalRef.current, { scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: onSuccess });
    }, 1000);
  };

  const handleClose = () => {
    gsap.to(modalRef.current, { y: 30, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      {/* Container Modal */}
      <div ref={modalRef} className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-[#E0E0E0]">
        
        {/* Header Modal */}
        <div className="bg-[#264653] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black">Selesaikan Pembayaran</h2>
            <p className="text-[#E0F2F1]/80 text-sm mt-1">{cartItems.length} Item dalam pesanan</p>
          </div>
          <button onClick={handleClose} disabled={isProcessing} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            ✕
          </button>
        </div>

        {/* Body Modal (2 Kolom: Ringkasan & Metode) */}
        <div className="flex flex-col md:flex-row bg-[#FDFBF6]">
          
          {/* Kolom Kiri: Ringkasan & Total */}
          <div className="md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-[#E0E0E0] flex flex-col justify-center bg-white">
            <p className="text-[#607D8B] font-bold text-sm uppercase tracking-widest mb-2">Total Tagihan</p>
            <p className="text-5xl font-black text-[#E76F51] mb-6">{formatRupiah(total)}</p>
            
            <div className="bg-[#F5F5F5] p-4 rounded-2xl border border-[#E0E0E0]">
              <p className="text-xs font-bold text-[#607D8B] mb-2">Item Pertama:</p>
              <p className="text-sm font-extrabold text-[#264653] line-clamp-2">{cartItems?.name}</p>
              {cartItems.length > 1 && <p className="text-xs text-[#2A9D8F] font-bold mt-1">...dan {cartItems.length - 1} item lainnya</p>}
            </div>
          </div>

          {/* Kolom Kanan: Metode Pembayaran */}
          <div className="md:w-1/2 p-8 flex flex-col gap-5">
            <p className="text-[#607D8B] font-bold text-sm uppercase tracking-widest">Pilih Metode</p>
            
            <div className="grid grid-cols-3 gap-2">
              {['QRIS', 'CASH', 'DEBIT'].map((method) => (
                <button key={method} onClick={() => setPaymentMethod(method)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                    paymentMethod === method ? 'bg-[#2A9D8F] text-white border-[#2A9D8F] shadow-md' : 'bg-white text-[#455A64] border-[#E0E0E0] hover:bg-[#F5F5F5]'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* Input Khusus Uang Tunai (CASH) */}
            {paymentMethod === 'CASH' && (
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-xs font-bold text-[#607D8B]">Uang Diterima (Rp)</label>
                <input 
                  type="text" 
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  placeholder="Misal: 200000"
                  className="w-full bg-white border border-[#E0E0E0] p-4 rounded-xl font-bold text-[#264653] outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/20"
                />
                {parsedCash > 0 && (
                  <div className={`p-3 rounded-xl mt-2 text-sm font-bold flex justify-between ${change >= 0 ? 'bg-[#E0F2F1] text-[#2A9D8F]' : 'bg-[#FFEBEE] text-[#E53935]'}`}>
                    <span>{change >= 0 ? 'Kembalian:' : 'Uang Kurang:'}</span>
                    <span>{formatRupiah(Math.abs(change))}</span>
                  </div>
                )}
              </div>
            )}

            {/* Dummy Barcode untuk QRIS */}
            {paymentMethod === 'QRIS' && (
              <div className="flex-1 flex flex-col items-center justify-center bg-white border border-[#E0E0E0] rounded-xl p-4 animate-in fade-in border-dashed">
                <div className="w-24 h-24 bg-[#264653] flex items-center justify-center rounded-lg text-white text-3xl opacity-20 mb-2">📱</div>
                <p className="text-[10px] font-bold text-[#607D8B]">Siapkan Scanner Pelanggan</p>
              </div>
            )}

          </div>
        </div>

        {/* Footer Modal: Tombol Aksi */}
        <div className="p-6 bg-white border-t border-[#E0E0E0]">
          <button 
            onClick={handleSuccess}
            disabled={isProcessing || (paymentMethod === 'CASH' && change < 0)}
            className="w-full bg-[#E76F51] hover:bg-[#D65F41] disabled:bg-[#B0BEC5] disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-100 transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-2"
          >
            {isProcessing ? '🔄 Memproses...' : '✅ Cetak Struk & Selesaikan'}
          </button>
        </div>

      </div>
    </div>
  );
}