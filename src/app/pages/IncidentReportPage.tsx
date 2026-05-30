import { useState } from "react";
import { AlertTriangle, Plus, Search, Eye, X, Save, AlertOctagon, CheckCircle2, RefreshCw } from "lucide-react";

type IncidentSeverity = "Thấp" | "Trung bình" | "Khẩn cấp";
type IncidentStatus = "Chờ tiếp nhận" | "Đang xử lý" | "Đã khắc phục";

const SEVERITY_CFG: Record<IncidentSeverity, { bg: string; text: string }> = {
  "Thấp": { bg: "bg-blue-50 text-blue-700", text: "Thấp" },
  "Trung bình": { bg: "bg-amber-50 text-amber-700", text: "Trung bình" },
  "Khẩn cấp": { bg: "bg-rose-50 text-rose-700", text: "Khẩn cấp" },
};

const STATUS_CFG: Record<IncidentStatus, { bg: string; text: string; icon: React.ElementType }> = {
  "Chờ tiếp nhận": { bg: "bg-slate-100 text-slate-700", text: "Chờ tiếp nhận", icon: AlertTriangle },
  "Đang xử lý": { bg: "bg-amber-100 text-amber-700", text: "Đang xử lý", icon: RefreshCw },
  "Đã khắc phục": { bg: "bg-green-100 text-green-700", text: "Đã khắc phục", icon: CheckCircle2 },
};

const MOCK_INCIDENTS = [
  { maBaoCao: "BC001", maPhong: "A301", thietBi: "Máy chiếu Panasonic PT-VX610 (TB001)", moTaSuCo: "Bóng đèn máy chiếu bị mờ nhấp nháy liên tục, không hiển thị rõ slide bài giảng.", mucDo: "Trung bình" as IncidentSeverity, nguoiBao: "TS. Nguyễn Văn An", ngayBao: "2026-05-29", trangThai: "Chờ tiếp nhận" as IncidentStatus },
  { maBaoCao: "BC002", maPhong: "C101", thietBi: "Bộ loa hội trường Soundking (TB004)", moTaSuCo: "Loa phát ra tiếng rè lớn khi cắm micro, giảng viên không thể sử dụng.", mucDo: "Khẩn cấp" as IncidentSeverity, nguoiBao: "ThS. Lê Hoàng Nam", ngayBao: "2026-05-28", trangThai: "Đang xử lý" as IncidentStatus, ghiChuXyLy: "Đang chờ nhà cung cấp đến bảo hành màng loa." },
  { maBaoCao: "BC003", maPhong: "B201", thietBi: "Điều hòa Panasonic 18000 BTU (TB006)", moTaSuCo: "Điều hòa chảy nước xuống giảng đường, quạt gió kêu to.", mucDo: "Thấp" as IncidentSeverity, nguoiBao: "Cô Vũ Thanh Mai", ngayBao: "2026-05-25", trangThai: "Đã khắc phục" as IncidentStatus, ghiChuXyLy: "Đã thông ống dẫn nước thải và vệ sinh lưới lọc ngày 26/05." },
  { maBaoCao: "BC004", maPhong: "D401", thietBi: "Máy tính giảng viên", moTaSuCo: "Máy tính không lên nguồn, quạt CPU không quay.", mucDo: "Khẩn cấp" as IncidentSeverity, nguoiBao: "ThS. Trần Thị Bình", ngayBao: "2026-05-30", trangThai: "Chờ tiếp nhận" as IncidentStatus },
];

export function IncidentReportPage() {
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS);
  const [search, setSearch] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("Tất cả");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [selectedIncident, setSelectedIncident] = useState<typeof MOCK_INCIDENTS[0] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newForm, setNewForm] = useState({
    maPhong: "",
    thietBi: "",
    moTaSuCo: "",
    mucDo: "Trung bình" as IncidentSeverity,
  });

  const filtered = incidents.filter((inc) => {
    const matchSearch = inc.maPhong.toLowerCase().includes(search.toLowerCase()) || inc.thietBi.toLowerCase().includes(search.toLowerCase()) || inc.moTaSuCo.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = filterSeverity === "Tất cả" || inc.mucDo === filterSeverity;
    const matchStatus = filterStatus === "Tất cả" || inc.trangThai === filterStatus;
    return matchSearch && matchSeverity && matchStatus;
  });

  const handleAddIncident = () => {
    if (!newForm.maPhong.trim() || !newForm.thietBi.trim() || !newForm.moTaSuCo.trim()) {
      alert("Vui lòng điền đầy đủ thông tin phòng học, thiết bị và mô tả sự cố.");
      return;
    }
    const newIncident = {
      maBaoCao: `BC${String(incidents.length + 1).padStart(3, "0")}`,
      maPhong: newForm.maPhong.toUpperCase(),
      thietBi: newForm.thietBi,
      moTaSuCo: newForm.moTaSuCo,
      mucDo: newForm.mucDo,
      nguoiBao: "TS. Nguyễn Văn An", // Mock logged-in user
      ngayBao: new Date().toISOString().split("T")[0],
      trangThai: "Chờ tiếp nhận" as IncidentStatus,
    };
    setIncidents([newIncident, ...incidents]);
    setShowAddModal(false);
    setNewForm({ maPhong: "", thietBi: "", moTaSuCo: "", mucDo: "Trung bình" });
  };

  const handleUpdateStatus = (maBaoCao: string, targetStatus: IncidentStatus, note?: string) => {
    setIncidents(incidents.map((inc) => {
      if (inc.maBaoCao === maBaoCao) {
        const updated = { ...inc, trangThai: targetStatus };
        if (note) {
          updated.ghiChuXyLy = note;
        }
        return updated;
      }
      return inc;
    }));
    // Sync current selected incident details if open
    if (selectedIncident?.maBaoCao === maBaoCao) {
      setSelectedIncident(prev => prev ? { ...prev, trangThai: targetStatus, ghiChuXyLy: note || prev.ghiChuXyLy } : null);
    }
  };

  const stats = {
    tong: incidents.length,
    choTiepNhan: incidents.filter(i => i.trangThai === "Chờ tiếp nhận").length,
    dangXyLy: incidents.filter(i => i.trangThai === "Đang xử lý").length,
    daKhacPhuc: incidents.filter(i => i.trangThai === "Đã khắc phục").length,
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2"><AlertOctagon size={24} /> Báo cáo & Tiếp nhận Sự cố</h2>
          <p className="text-rose-100 text-xs mt-1">Giảng viên và kỹ thuật viên gửi yêu cầu sửa chữa thiết bị hư hỏng tại các giảng đường.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-white text-rose-700 hover:bg-rose-50 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0">
          <Plus size={16} /> Gửi báo cáo sự cố mới
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tổng số sự cố", value: stats.tong, bg: "bg-white", border: "border-slate-200", text: "text-slate-800" },
          { label: "Chờ tiếp nhận", value: stats.choTiepNhan, bg: "bg-slate-50", border: "border-slate-300", text: "text-slate-600" },
          { label: "Đang khắc phục", value: stats.dangXyLy, bg: "bg-amber-50/50", border: "border-amber-200", text: "text-amber-700" },
          { label: "Đã khắc phục xong", value: stats.daKhacPhuc, bg: "bg-green-50/50", border: "border-green-200", text: "text-green-700" }
        ].map((s, idx) => (
          <div key={idx} className={`rounded-xl border p-4 ${s.bg} ${s.border} shadow-sm flex items-center justify-between`}>
            <span className="text-xs text-slate-500 font-medium">{s.label}</span>
            <span className={`text-xl font-bold ${s.text}`}>{s.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incidents Table Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="font-semibold text-slate-800 text-sm">Danh sách báo cáo</h3>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Phòng, thiết bị, lỗi..."
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 w-36"
                />
              </div>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              >
                <option value="Tất cả">Mức độ: Tất cả</option>
                <option value="Thấp">Thấp</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Khẩn cấp">Khẩn cấp</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              >
                <option value="Tất cả">Trạng thái: Tất cả</option>
                <option value="Chờ tiếp nhận">Chờ tiếp nhận</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đã khắc phục">Đã khắc phục</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase">
                  <th className="py-3 px-4">Mã BC</th>
                  <th className="py-3 px-4">Phòng</th>
                  <th className="py-3 px-4">Thiết bị sự cố</th>
                  <th className="py-3 px-4">Độ ưu tiên</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Xem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((inc) => {
                  const statusCfg = STATUS_CFG[inc.trangThai];
                  const severityCfg = SEVERITY_CFG[inc.mucDo];
                  const StatusIcon = statusCfg.icon;
                  return (
                    <tr key={inc.maBaoCao} className={`hover:bg-slate-50/50 cursor-pointer ${selectedIncident?.maBaoCao === inc.maBaoCao ? "bg-rose-50/20" : ""}`} onClick={() => setSelectedIncident(inc)}>
                      <td className="py-3 px-4 font-mono font-bold text-slate-500">{inc.maBaoCao}</td>
                      <td className="py-3 px-4 font-bold text-purple-700">{inc.maPhong}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800 line-clamp-1">{inc.thietBi}</div>
                        <div className="text-[10px] text-slate-400">Bởi: {inc.nguoiBao} • {inc.ngayBao}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full font-semibold ${severityCfg.bg}`}>
                          {severityCfg.text}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${statusCfg.bg}`}>
                          <StatusIcon size={10} /> {statusCfg.text}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="p-1 text-slate-400 hover:text-rose-600"><Eye size={14} /></button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                      Không tìm thấy sự cố nào cần báo cáo.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Ticket Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          {selectedIncident ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800 text-sm">Chi tiết Sự cố {selectedIncident.maBaoCao}</h3>
                  <button onClick={() => setSelectedIncident(null)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                </div>
                <div className="p-5 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 block mb-0.5">Phòng học:</span>
                      <span className="text-sm font-bold text-slate-800">{selectedIncident.maPhong}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-0.5">Mức độ ưu tiên:</span>
                      <span className={`inline-flex px-2 py-0.5 rounded-full font-semibold ${SEVERITY_CFG[selectedIncident.mucDo].bg}`}>
                        {selectedIncident.mucDo}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-0.5">Thiết bị báo hỏng:</span>
                    <span className="font-semibold text-slate-700 bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-200 block">
                      {selectedIncident.thietBi}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-0.5">Chi tiết sự cố hư hại:</span>
                    <p className="text-slate-600 bg-rose-50/30 rounded-lg p-3 border border-rose-100 leading-relaxed whitespace-pre-line">
                      {selectedIncident.moTaSuCo}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                    <div>Báo cáo bởi: <span className="font-medium text-slate-700">{selectedIncident.nguoiBao}</span></div>
                    <div>Ngày báo: <span className="font-medium text-slate-700">{selectedIncident.ngayBao}</span></div>
                  </div>

                  {selectedIncident.ghiChuXyLy && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <span className="font-semibold text-slate-700 block mb-1">Cập nhật xử lý sự cố:</span>
                      <p className="text-slate-600 font-medium leading-relaxed">{selectedIncident.ghiChuXyLy}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Update Quick Action */}
              <div className="p-5 border-t border-slate-100 bg-slate-50 rounded-b-xl space-y-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cập nhật trạng thái sự cố (Dành cho KTV)</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedIncident.maBaoCao, "Đang xử lý", "Kỹ thuật viên đang chuẩn bị linh kiện thay thế.")}
                    disabled={selectedIncident.trangThai === "Đang xử lý"}
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-lg text-[10px] font-bold transition-colors"
                  >
                    Tiếp nhận sửa
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedIncident.maBaoCao, "Đã khắc phục", "Đã sửa chữa khắc phục hoạt động bình thường.")}
                    disabled={selectedIncident.trangThai === "Đã khắc phục"}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-lg text-[10px] font-bold transition-colors"
                  >
                    Đã khắc phục xong
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center h-full min-h-[350px]">
              <AlertTriangle size={36} className="text-slate-300 mb-2" />
              <p className="text-xs">Chọn một báo cáo sự cố từ danh sách bên trái để kiểm tra chi tiết và thực hiện cập nhật xử lý.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Report Incident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-800">Báo cáo hư hỏng thiết bị mới</h3>
              <button onClick={() => setShowAddModal(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Phòng học xảy ra sự cố</label>
                  <input
                    value={newForm.maPhong}
                    onChange={(e) => setNewForm({ ...newForm, maPhong: e.target.value.toUpperCase() })}
                    placeholder="Ví dụ: A301"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 uppercase font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mức độ ảnh hưởng</label>
                  <select
                    value={newForm.mucDo}
                    onChange={(e) => setNewForm({ ...newForm, mucDo: e.target.value as IncidentSeverity })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white font-medium"
                  >
                    <option value="Thấp">Thấp (Có thể tiếp tục học)</option>
                    <option value="Trung bình">Trung bình (Ảnh hưởng bài giảng)</option>
                    <option value="Khẩn cấp">Khẩn cấp (Hỏng nghiêm trọng)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Thiết bị hỏng hóc</label>
                <input
                  value={newForm.thietBi}
                  onChange={(e) => setNewForm({ ...newForm, thietBi: e.target.value })}
                  placeholder="Ví dụ: Máy chiếu Panasonic TB001 hoặc Điều hòa"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Mô tả chi tiết sự cố</label>
                <textarea
                  value={newForm.moTaSuCo}
                  onChange={(e) => setNewForm({ ...newForm, moTaSuCo: e.target.value })}
                  rows={4}
                  placeholder="Mô tả cụ thể biểu hiện hư hại để KTV chuẩn bị dụng cụ phù hợp..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-xs text-slate-600">Hủy</button>
              <button onClick={handleAddIncident} className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
                <Save size={14} /> Gửi báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
