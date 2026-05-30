import { useState } from "react";
import { Wrench, Plus, Search, X, Save, Edit2, Trash2, Calendar, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";

type MaintenanceStatus = "Chưa thực hiện" | "Đang bảo trì" | "Đã hoàn thành";

const STATUS_CFG: Record<MaintenanceStatus, { badge: string; border: string; icon: React.ElementType }> = {
  "Chưa thực hiện": { badge: "bg-slate-100 text-slate-700", border: "border-l-slate-400", icon: AlertCircle },
  "Đang bảo trì": { badge: "bg-amber-100 text-amber-700", border: "border-l-amber-400", icon: Wrench },
  "Đã hoàn thành": { badge: "bg-green-100 text-green-700", border: "border-l-green-400", icon: CheckCircle2 },
};

const MOCK_MAINTENANCE = [
  { maBaoTri: "BT001", thietBi: "Điều hòa Daikin 24000 BTU (TB002)", ngayBatDau: "2026-05-20", ngayHoanThanh: "2026-05-22", chiPhi: 750000, noiDung: "Nạp gas bổ sung R32, vệ sinh lưới lọc giàn lạnh và thổi bụi giàn nóng.", nguoiThucHien: "KTV. Nguyễn Văn Hùng", trangThai: "Đã hoàn thành" as MaintenanceStatus, maPhong: "A301" },
  { maBaoTri: "BT002", thietBi: "Bộ loa hội trường Soundking (TB004)", ngayBatDau: "2026-05-28", ngayHoanThanh: "2026-06-01", chiPhi: 1200000, noiDung: "Thay thế màng loa bass bị rách, căn chỉnh amply hội trường.", nguoiThucHien: "Điện tử Bách Khoa Corp", trangThai: "Đang bảo trì" as MaintenanceStatus, maPhong: "C101" },
  { maBaoTri: "BT003", thietBi: "Máy chiếu Panasonic PT-VX610 (TB001)", ngayBatDau: "2026-06-05", ngayHoanThanh: "2026-06-06", chiPhi: 2500000, noiDung: "Thay bóng đèn chiếu halogen mới chính hãng, căn chỉnh tiêu cự ống kính.", nguoiThucHien: "Panasonic Service Center", trangThai: "Chưa thực hiện" as MaintenanceStatus, maPhong: "A301" },
  { maBaoTri: "BT004", thietBi: "Hệ thống điện & Đèn chiếu sáng giảng đường", ngayBatDau: "2026-05-15", ngayHoanThanh: "2026-05-16", chiPhi: 450000, noiDung: "Thay mới 4 bóng đèn tuýp LED Philips hư hỏng, kiểm tra cầu dao tổng.", nguoiThucHien: "Tổ kỹ thuật HUMG", trangThai: "Đã hoàn thành" as MaintenanceStatus, maPhong: "B201" }
];

export function MaintenancePage() {
  const [maintenanceList, setMaintenanceList] = useState(MOCK_MAINTENANCE);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<typeof MOCK_MAINTENANCE[0] | null>(null);
  const [form, setForm] = useState({
    maBaoTri: "",
    thietBi: "",
    maPhong: "",
    ngayBatDau: "",
    ngayHoanThanh: "",
    chiPhi: 0,
    noiDung: "",
    nguoiThucHien: "",
    trangThai: "Chưa thực hiện" as MaintenanceStatus,
  });

  const filtered = maintenanceList.filter((m) => {
    const matchSearch = m.thietBi.toLowerCase().includes(search.toLowerCase()) || m.maBaoTri.toLowerCase().includes(search.toLowerCase()) || m.maPhong.toLowerCase().includes(search.toLowerCase()) || m.noiDung.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Tất cả" || m.trangThai === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => {
    setEditItem(null);
    setForm({
      maBaoTri: `BT${String(maintenanceList.length + 1).padStart(3, "0")}`,
      thietBi: "",
      maPhong: "",
      ngayBatDau: new Date().toISOString().split("T")[0],
      ngayHoanThanh: "",
      chiPhi: 0,
      noiDung: "",
      nguoiThucHien: "",
      trangThai: "Chưa thực hiện",
    });
    setShowModal(true);
  };

  const openEdit = (m: typeof MOCK_MAINTENANCE[0]) => {
    setEditItem(m);
    setForm({ ...m });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.thietBi.trim() || !form.maPhong.trim() || !form.nguoiThucHien.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin thiết bị, phòng học và đơn vị sửa chữa.");
      return;
    }
    if (editItem) {
      setMaintenanceList(maintenanceList.map((m) => m.maBaoTri === editItem.maBaoTri ? { ...m, ...form } : m));
    } else {
      setMaintenanceList([...maintenanceList, { ...form }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Xóa phiếu lịch trình bảo trì này?")) {
      setMaintenanceList(maintenanceList.filter((m) => m.maBaoTri !== id));
    }
  };

  const handleComplete = (id: string) => {
    setMaintenanceList(maintenanceList.map((m) => {
      if (m.maBaoTri === id) {
        return {
          ...m,
          trangThai: "Đã hoàn thành" as MaintenanceStatus,
          ngayHoanThanh: new Date().toISOString().split("T")[0]
        };
      }
      return m;
    }));
  };

  const budgetStats = {
    tongChiPhi: maintenanceList.filter(m => m.trangThai === "Đã hoàn thành").reduce((sum, m) => sum + m.chiPhi, 0),
    soLuongDang: maintenanceList.filter(m => m.trangThai === "Đang bảo trì").length,
    soLuongXong: maintenanceList.filter(m => m.trangThai === "Đã hoàn thành").length,
    soLuongKeHoach: maintenanceList.filter(m => m.trangThai === "Chưa thực hiện").length,
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Row */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-700 text-amber-400 flex items-center justify-center shrink-0 border border-slate-600"><Wrench size={24} className="animate-spin-slow" /></div>
          <div>
            <h2 className="text-xl font-bold">Kế hoạch & Lịch trình Bảo trì thiết bị</h2>
            <p className="text-slate-400 text-xs mt-1">Lập danh sách định kỳ, theo dõi tiến độ sửa chữa và quản lý chi phí bảo dưỡng tài sản giảng đường HUMG.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-800/80 rounded-xl px-4 py-2 border border-slate-700 text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Đã chi (VND)</div>
            <div className="text-lg font-bold text-emerald-400">
              {budgetStats.tongChiPhi.toLocaleString("vi-VN")} ₫
            </div>
          </div>
          <button onClick={openAdd} className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 shrink-0 self-center">
            <Plus size={16} /> Lập lịch bảo trì
          </button>
        </div>
      </div>

      {/* Filter and Content Controls */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {(["Tất cả", "Chưa thực hiện", "Đang bảo trì", "Đã hoàn thành"] as const).map((st) => {
            const isSelected = filterStatus === st;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-950"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {st} ({st === "Tất cả" ? maintenanceList.length : maintenanceList.filter(m => m.trangThai === st).length})
              </button>
            );
          })}
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm thiết bị, nội dung, kỹ thuật viên..."
            className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((m) => {
          const cfg = STATUS_CFG[m.trangThai];
          const StatusIcon = cfg.icon;
          return (
            <div key={m.maBaoTri} className={`bg-white rounded-xl border border-slate-200 shadow-sm p-5 border-l-4 ${cfg.border} hover:shadow-md transition-all flex flex-col justify-between space-y-4 group`}>
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-xs font-semibold text-slate-400">{m.maBaoTri}</span>
                    <h3 className="font-bold text-slate-800 text-sm mt-0.5 group-hover:text-amber-600 transition-colors">{m.thietBi}</h3>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${cfg.badge}`}>
                    <StatusIcon size={10} /> {m.trangThai}
                  </span>
                </div>

                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">{m.noiDung}</p>

                <div className="grid grid-cols-2 gap-3 text-xs border-b border-slate-100 pb-3 mb-3 text-slate-500">
                  <div className="flex items-center gap-1.5"><Calendar size={13} /> <span>Bắt đầu: <strong className="text-slate-700">{m.ngayBatDau}</strong></span></div>
                  <div className="flex items-center gap-1.5"><Calendar size={13} /> <span>Hoàn thành: <strong className="text-slate-700">{m.ngayHoanThanh || "---"}</strong></span></div>
                  <div className="flex items-center gap-1.5"><DollarSign size={13} /> <span>Dự toán: <strong className="text-slate-700">{m.chiPhi.toLocaleString("vi-VN")} ₫</strong></span></div>
                  <div className="flex items-center gap-1.5"><Wrench size={13} /> <span>Kỹ thuật: <strong className="text-slate-700">{m.nguoiThucHien}</strong></span></div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">Khu vực: {m.maPhong}</span>
                <div className="flex items-center gap-2">
                  {m.trangThai !== "Đã hoàn thành" && (
                    <button
                      onClick={() => handleComplete(m.maBaoTri)}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-bold transition-colors"
                    >
                      Xác nhận Hoàn thành
                    </button>
                  )}
                  <button onClick={() => openEdit(m)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={13} /></button>
                  <button onClick={() => handleDelete(m.maBaoTri)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 py-16 text-center text-slate-400 text-sm">
            Không tìm thấy kế hoạch bảo trì nào phù hợp.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-800">{editItem ? "Chỉnh sửa phiếu bảo trì" : "Lập kế hoạch bảo trì mới"}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mã phiếu</label>
                  <input
                    value={form.maBaoTri}
                    onChange={(e) => setForm({ ...form, maBaoTri: e.target.value })}
                    disabled={!!editItem}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Phòng học bảo trì</label>
                  <input
                    value={form.maPhong}
                    onChange={(e) => setForm({ ...form, maPhong: e.target.value.toUpperCase() })}
                    placeholder="Ví dụ: A301"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 uppercase font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Thiết bị bảo trì</label>
                <input
                  value={form.thietBi}
                  onChange={(e) => setForm({ ...form, thietBi: e.target.value })}
                  placeholder="Ví dụ: Máy chiếu Panasonic (TB001) hoặc Dàn đèn điện"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Đơn vị / Kỹ thuật viên thực hiện</label>
                <input
                  value={form.nguoiThucHien}
                  onChange={(e) => setForm({ ...form, nguoiThucHien: e.target.value })}
                  placeholder="Đại diện kỹ thuật hoặc tên đơn vị thầu..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Dự toán chi phí (₫)</label>
                  <input
                    type="number"
                    value={form.chiPhi}
                    onChange={(e) => setForm({ ...form, chiPhi: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Trạng thái bảo trì</label>
                  <select
                    value={form.trangThai}
                    onChange={(e) => setForm({ ...form, trangThai: e.target.value as MaintenanceStatus })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="Chưa thực hiện">Chưa thực hiện</option>
                    <option value="Đang bảo trì">Đang bảo trì</option>
                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={form.ngayBatDau}
                    onChange={(e) => setForm({ ...form, ngayBatDau: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Ngày hoàn thành (nếu có)</label>
                  <input
                    type="date"
                    value={form.ngayHoanThanh}
                    onChange={(e) => setForm({ ...form, ngayHoanThanh: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nội dung công tác bảo trì</label>
                <textarea
                  value={form.noiDung}
                  onChange={(e) => setForm({ ...form, noiDung: e.target.value })}
                  rows={3}
                  placeholder="Mô tả cụ thể các hạng mục sửa chữa, linh kiện cần thay..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-xs text-slate-600">Hủy</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
                <Save size={14} /> Lưu kế hoạch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
