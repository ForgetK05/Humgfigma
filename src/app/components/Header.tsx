import { Bell, Search, UserCircle } from "lucide-react";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
        
        <button className="relative text-slate-500 hover:text-slate-700">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-slate-700">Quản trị viên</div>
            <div className="text-xs text-slate-500">admin@humg.edu.vn</div>
          </div>
          <UserCircle size={32} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}
