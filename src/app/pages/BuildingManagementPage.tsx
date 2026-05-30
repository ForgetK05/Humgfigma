import { useState } from "react";
import { Building2, Plus, Edit2, Trash2, Search, MapPin, Layers, X, Save } from "lucide-react";

const MOCK_BUILDINGS = [
  { maToaNha: "TNA", tenToaNha: "Tòa A – Nhà Hiệu bộ", diaChi: "Khu A – Cổng chính", soTang: 6, soPhong: 24 },
  { maToaNha: "TNB", tenToaNha: "Tòa B – Giảng đường chính", diaChi: "Khu B – Trung tâm", soTang: 5, soPhong: 30 },
  { maToaNha: "TNC", tenToaNha: "Tòa C – Thực hành Công nghệ", diaChi: "Khu C – Phía Đông", soTang: 4, soPhong: 16 },
  { maToaNha: "TND", tenToaNha: "Tòa D – Thư viện & NCKH", diaChi: "Khu D – Phía Nam", soTang: 3, soPhong: 12 },
  { maToaNha: "TNE", tenToaNha: "Tòa E – Phòng thí nghiệm", diaChi: "Khu E – Phía Tây", soTang: 4, soPhong: 10 },
];

const FLOOR_COLORS = ["bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700", "bg-teal-100 text-teal-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700"];

export function BuildingManagementPage() {
  const [buildings, setBuildings] = useState(MOCK_BUILDINGS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<typeof MOCK_BUILDINGS[0] | null>(null);
  const [form, setForm] = useState({ maToaNha: "", tenToaNha: "", diaChi: "", soTang: 1 });

  const filtered = buildings.filter((b) =>
    b.tenToaNha.toLowerCase().includes(search.toLowerCase()) || b.maToaNha.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditItem(null); setForm({ maToaNha: "", tenToaNha: "", diaChi: "", soTang: 1 }); setShowModal(true); };
  const openEdit = (b: typeof MOCK_BUILDINGS[0]) => { setEditItem(b); setForm({ maToaNha: b.maToaNha, tenToaNha: b.tenToaNha, diaChi: b.diaChi, soTang: b.soTang }); setShowModal(true); };
  const handleSave = () => {
    if (editItem) setBuildings(buildings.map((b) => b.maToaNha === editItem.maToaNha ? { ...b, ...form } : b));
    else setBuildings([...buildings, { ...form, soPhong: 0 }]);
    setShowModal(false);
  };
  const handleDelete = (id: string) => { if (confirm("Xóa tòa nhà này?")) setBuildings(buildings.filter((b) => b.maToaNha !== id)); };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Tổng tòa nhà", value: buildings.length, icon: Building2, color: "text-teal-600", bg: "bg-teal-50" },
          { label: "Tổng phòng học", value: buildings.reduce((s, b) => s + b.soPhong, 0), icon: Layers, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Tổng số tầng", value: buildings.reduce((s, b) => s + b.soTang, 0), icon: MapPin, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
              <div className={`w-10 h-10 rounded-full ${s.bg} ${s.color} flex items-center justify-center`}><Icon size={20} /></div>
              <div><div className="text-xs text-slate-500">{s.label}</div><div className="text-xl font-bold text-slate-800">{s.value}</div></div>
            </div>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <h2 className="text-base font-semibold text-slate-800 flex-1">Danh sách Tòa nhà</h2>
          <div className="relative">
            <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm..." className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-44" />
          </div>
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus size={15} /> Thêm tòa nhà
          </button>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((b, idx) => (
            <div key={b.maToaNha} className="border border-slate-200 rounded-xl p-4 hover:border-teal-300 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${FLOOR_COLORS[idx % FLOOR_COLORS.length]} flex items-center justify-center font-bold text-sm`}>
                  {b.maToaNha}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(b)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(b.maToaNha)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                </div>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-1">{b.tenToaNha}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-3"><MapPin size={11} />{b.diaChi}</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-slate-50 rounded-lg px-2 py-1.5 text-center">
                  <div className="text-lg font-bold text-slate-800">{b.soTang}</div>
                  <div className="text-xs text-slate-500">Số tầng</div>
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg px-2 py-1.5 text-center">
                  <div className="text-lg font-bold text-teal-600">{b.soPhong}</div>
                  <div className="text-xs text-slate-500">Phòng học</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-slate-800">{editItem ? "Sửa tòa nhà" : "Thêm tòa nhà mới"}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Mã tòa nhà", key: "maToaNha", disabled: !!editItem },
                { label: "Tên tòa nhà", key: "tenToaNha" },
                { label: "Địa chỉ", key: "diaChi" },
              ].map(({ label, key, disabled }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                  <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} disabled={disabled}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-slate-50" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Số tầng</label>
                <input type="number" min={1} value={form.soTang} onChange={(e) => setForm({ ...form, soTang: Number(e.target.value) })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm text-slate-600">Hủy</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                <Save size={15} /> Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
