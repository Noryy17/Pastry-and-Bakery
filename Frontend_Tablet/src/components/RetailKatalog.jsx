import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function RetailKatalog({ onAddToCart }) {
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Data Produk Retail SEKARANG MENGGUNAKAN FOTO ASLI (Images)
  // Nanti kamu bisa ganti link gambarnya pakai foto lokalmu, misal: image: '/kue/risoles.jpg'
  const products = [
    { 
      id: 'r1', name: 'Butter Croissant', price: 18000, category: 'Pastry', 
      image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88fbf?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 'r2', name: 'Risoles Mayo', price: 8000, category: 'Gurih', 
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 'r3', name: 'Lapis Surabaya', price: 12000, category: 'Manis', 
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 'r4', name: 'Choco Lava Muffin', price: 22000, category: 'Manis', 
      image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 'r5', name: 'Garlic Bread', price: 15000, category: 'Gurih', 
      image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 'r6', name: 'Strawberry Danish', price: 25000, category: 'Pastry', 
      image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 'r7', name: 'Baguette', price: 20000, category: 'Pastry', 
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bfc54?auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 'r8', name: 'Pretzel', price: 16000, category: 'Gurih', 
      image: 'https://images.unsplash.com/photo-1611293388250-580b08c4a145?auto=format&fit=crop&w=400&q=80' 
    },
  ];

  const categories = ['Semua', 'Pastry', 'Gurih', 'Manis'];

  const filteredProducts = activeCategory === 'Semua' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // GSAP: Animasi muncul berurutan (Stagger)
  useEffect(() => {
    const cards = gridRef.current.children;
    gsap.fromTo(cards, 
      { y: 30, opacity: 0, scale: 0.95 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.04, ease: "back.out(1.2)" }
    );
  }, [activeCategory]);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 w-full">
      
      {/* Header & Filter */}
      <div className="flex justify-between items-end pb-4 border-b-2 border-[#E0E0E0] mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#264653]">Katalog Retail</h1>
          <p className="text-[#607D8B] mt-1">Pilih roti harian atau jajanan pasar untuk pelanggan.</p>
        </div>
        
        {/* Kategori Pills */}
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-[#264653] text-white shadow-md' 
                : 'bg-white text-[#607D8B] border border-[#E0E0E0] hover:bg-[#F5F5F5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Produk */}
      <div ref={gridRef} className="grid grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-[24px] p-4 border border-[#E0E0E0] shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#2A9D8F] flex flex-col group cursor-pointer"
            onClick={() => onAddToCart({
              name: product.name,
              size: '1 Pcs',
              price: product.price,
              qty: 1
            })}
          >
            {/* FOTO PRODUK (Menggantikan Emoji) */}
            <div className="w-full h-36 rounded-[16px] overflow-hidden mb-4 relative bg-[#F5F5F5]">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay shadow tipis di bawah gambar biar elegan */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Info Teks */}
            <div className="flex flex-col flex-1 px-1">
              <span className="text-[10px] font-extrabold text-[#2A9D8F] uppercase tracking-widest mb-1">
                {product.category}
              </span>
              <h3 className="font-extrabold text-[#264653] leading-tight mb-3 text-[15px]">
                {product.name}
              </h3>
              
              {/* Harga & Tombol */}
              <div className="mt-auto flex items-center justify-between pt-1">
                <span className="font-black text-[#E76F51] text-[17px]">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                <button className="w-9 h-9 rounded-full bg-[#E0F2F1] text-[#2A9D8F] flex items-center justify-center font-black transition-colors group-hover:bg-[#2A9D8F] group-hover:text-white shadow-sm">
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}