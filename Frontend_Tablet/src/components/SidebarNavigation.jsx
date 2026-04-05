import React from 'react';

const menus = [
  { name: 'Dashboard', icon: '📊' },
  { name: 'Custom Tart', icon: '🎂' },
  { name: 'Retail', icon: '🥐' },
  { name: 'Snack Box', icon: '📦' },
  { name: 'Laporan', icon: '📝' },
  { name: 'Settings', icon: '⚙️' },
];

export default function SidebarNavigation({ activeMenu, setActiveMenu }) {
  return (
    // Sidebar Background baru: Deep Slate (#264653)
    <nav className="w-64 flex flex-col py-8 bg-[#264653] text-white">
      {/* Logo Singkat */}
      <div className="w-16 h-16 bg-[#2A9D8F] rounded-2xl flex items-center justify-center text-3xl font-black mb-14 shadow-lg mx-auto">
        As
      </div>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col px-4 gap-3">
        {menus.map((menu) => (
          <button
            key={menu.name}
            onClick={() => setActiveMenu(menu.name)}
            className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-300 font-medium ${
              activeMenu === menu.name 
              ? 'bg-[#2A9D8F] text-white shadow-md' 
              : 'text-[#E0F2F1]/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-xl">{menu.icon}</span>
            <span className="text-sm tracking-tight">{menu.name}</span>
          </button>
        ))}
      </div>

      {/* User Info */}
      <div className="mt-auto px-6 border-t border-white/10 pt-6">
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
          <div className="w-10 h-10 bg-[#2A9D8F] rounded-full flex items-center justify-center text-lg font-bold">A</div>
          <div>
            <p className="font-bold text-sm">Admin Asri</p>
            <p className="text-xs text-[#E0F2F1]/60">administrator</p>
          </div>
        </div>
      </div>
    </nav>
  );
}