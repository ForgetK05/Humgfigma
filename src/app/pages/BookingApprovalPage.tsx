import { useState } from "react";
import { CheckCircle, XCircle, Clock, Eye, MessageSquare, X } from "lucide-react";

type Status = "Chờ duyệt" | "Đã phê duyệt" | "Từ chối";

const STATUS_CFG: Record<Status, { color: string; badge: string; icon: React.ElementType }> = {
  "Chờ duyệt": { color: "border-l-amber-400", badge: "bg-amber-100 text-amber-700", icon: Clock },
  "Đã phê duyệt": { color: "border-l-green-400", badge: "bg-green-100 text-green-700", icon: CheckCircle },
  "Từ chối": { color: "border-l-red-400", badge: "bg-red-100 text-red-700", icon: XCircle },
};

const MOCK_PHIEU = [
  { maPhieu: "PDK001", nguoiDang: "TS. Nguyễn Văn An", userID: "gv001", maPhong: "A301", ngayLap: "2026-05-28", ngaySuDung: "2026-06-02", maCa: "Ca 3", lyDo: "Dạy bù môn CSDL – Lớp CNTT02", trangThai: "Chờ duyệt" as Status },
  { maPhieu: "PDK002", nguoiDang: "ThS. Trần Thị Bình", userID: "gv002", maPhong: "B201", ngayLap: "2026-05-27", ngaySuDung: "2026-06-03", maCa: "Ca 1", lyDo: "Tổ chức seminar khoa học", trangThai: "Chờ duyệt" as Status },
  { maPhieu: "PDK003", nguoiDang: "Phạm Minh Đức", userID: "sv001", maPhong: "C101", ngayLap: "2026-05-26", ngaySuDung: "2026-05-31", maCa: "Ca 4", lyDo: "Họp nhóm đồ án, thực hành lập trình", trangThai: "Đã phê duyệt" as Status },
  { maPhieu: "PDK004", nguoiDang: "Hoàng Thị Hoa", userID: "sv002", maPhong: "D401", ngayLap: "2026-05-25", ngaySuDung: "2026-05-30", maCa: "Ca 2", lyDo: "Sự kiện câu lạc bộ khởi nghiệp", trangThai: "Từ chối" as Status, lyDoTuChoi: "Phòng đã được đặt cho sự kiện trường" },
  { maPhieu: "PDK005", nguoiDang: "TS. Nguyễn Văn An", userID: "gv001", maPhong: "B201", ngayLap: "2026-05-29", ngaySuDung: "2026-06-05", maCa: "Ca 2", lyDo: "Hướng dẫn nghiên cứu khoa học sinh viên", trangThai: "Chờ duyệt" as Status },
];

export function BookingApprovalPage() {
  const [phieus, setPhieus] = useState(MOCK_PHIEU);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [selectedPhieu, setSelectedPhieu] = useState<typeof MOCK_PHIEU[0] | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const filtered = phieus.filter((p) => filterStatus === "Tất cả" || p.trangThai === filterStatus);

  const handleApprove = (maPhieu: string) => {
    setPhieus(phieus.map((p) => p.maPhieu === maPhieu ? { ...p, trangThai: "Đã phê duyệt" } : p));
    setSelectedPhieu(null);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    setPhieus(phieus.map((p) => p.maPhieu === selectedPhieu?.maPhieu ? { ...p, trangThai: "Từ chối", lyDoTuChoi: rejectReason } : p));
    setShowRejectModal(false);
    setSelectedPhieu(null);
    setRejectReason("");
  };

  const counts = { "Chờ duyệt": phieus.filter(p => p.trangThai === "Chờ duyệt").length, "Đã phê duyệt": phieus.filter(p => p.trangThai === "Đã phê duyệt").length, "Từ chối": phieus.filter(p => p.trangThai === "Từ chối").length };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {(["Chờ duyệt", "Đã phê duyệt", "Từ chối"] as Status[]).map((s) => {
          const cfg = STATUS_CFG[s];
          const Icon = cfg.icon;
          return (
            <button key={s} onClick={() => setFilterStatus(filterStatus === s ? "Tất cả" : s)}
              className={`bg-white rounded-xl border-2 p-4 flex items-center gap-3 shadow-sm transition-all hover:shadow-md ${filterStatus === s ? "border-blue-400" : "border-slate-200"}`}>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.badge}`}><Icon size={13} />{s}</span>
              <span className="text-2xl font-bold text-slate-800 ml-auto">{counts[s]}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <h2 className="text-base font-semibold text-slate-800 flex-1">Danh sách Phiếu đăng ký</h2>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
              {["Tất cả", "Chờ duyệt", "Đã phê duyệt", "Từ chối"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="divide-y divide-slate-100">
            {filtered.map((p) => {
              const cfg = STATUS_CFG[p.trangThai];
              const Icon = cfg.icon;
              return (
                <button key={p.maPhieu} onClick={() => setSelectedPhieu(p)} className={`w-full text-left p-4 hover:bg-slate-50 transition-colors border-l-4 ${cfg.color} ${selectedPhieu?.maPhieu === p.maPhieu ? "bg-blue-50/50" : ""}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-slate-400">{p.maPhieu}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.badge}`}><Icon size={11} />{p.trangThai}</span>
                      </div>
                      <div className="font-medium text-slate-800 text-sm">{p.nguoiDang}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Phòng {p.maPhong} • {p.ngaySuDung} • {p.maCa}</div>
                    </div>
                    <Eye size={16} className="text-slate-300 mt-1 shrink-0" />
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && <div className="py-12 text-center text-slate-400 text-sm">Không có phiếu nào.</div>}
          </div>
        </div>

        {/* Detail */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          {selectedPhieu ? (
            <div>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Chi tiết phiếu {selectedPhieu.maPhieu}</h3>
                <button onClick={() => setSelectedPhieu(null)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
              </div>
              <div className="p-5 space-y-3 text-sm">
                {[
                  { label: "Người đăng ký", value: `${selectedPhieu.nguoiDang} (${selectedPhieu.userID})` },
                  { label: "Phòng học", value: selectedPhieu.maPhong },
                  { label: "Ngày lập phiếu", value: selectedPhieu.ngayLap },
                  { label: "Ngày sử dụng", value: selectedPhieu.ngaySuDung },
                  { label: "Ca học", value: selectedPhieu.maCa },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-slate-500 w-36 shrink-0">{label}:</span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </div>
                ))}
                <div className="flex gap-3">
                  <span className="text-slate-500 w-36 shrink-0">Lý do:</span>
                  <span className="text-slate-700 bg-slate-50 rounded-lg px-3 py-2 flex-1">{selectedPhieu.lyDo}</span>
                </div>
                {selectedPhieu.lyDoTuChoi && (
                  <div className="flex gap-3">
                    <span className="text-slate-500 w-36 shrink-0">Lý do từ chối:</span>
                    <span className="text-red-700 bg-red-50 rounded-lg px-3 py-2 flex-1">{selectedPhieu.lyDoTuChoi}</span>
                  </div>
                )}
                <div className="flex gap-3 items-center">
                  <span className="text-slate-500 w-36 shrink-0">Trạng thái:</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_CFG[selectedPhieu.trangThai].badge}`}>
                    {selectedPhieu.trangThai}
                  </span>
                </div>
              </div>
              {selectedPhieu.trangThai === "Chờ duyệt" && (
                <div className="p-5 pt-0 flex gap-3">
                  <button onClick={() => { setShowRejectModal(true); }} className="flex-1 py-2.5 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                    <XCircle size={16} /> Từ chối
                  </button>
                  <button onClick={() => handleApprove(selectedPhieu.maPhieu)} className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                    <CheckCircle size={16} /> Phê duyệt
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center py-24 text-slate-400">
              <div className="text-center">
                <Eye size={40} className="mx-auto mb-3 text-slate-300" />
                <p className="text-sm">Chọn một phiếu để xem chi tiết</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
            <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2"><MessageSquare size={18} className="text-red-500" /> Nhập lý do từ chối</h3>
            <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} rows={4} placeholder="Nhập lý do từ chối phiếu đăng ký này..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none" />
            <p className="text-xs text-slate-400 mt-1">Bắt buộc phải nhập lý do từ chối.</p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowRejectModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm text-slate-600">Hủy</button>
              <button onClick={handleReject} disabled={!rejectReason.trim()} className="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white rounded-lg text-sm font-medium">Xác nhận từ chối</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
