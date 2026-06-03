import { useState } from "react";
import { Clock, CheckCircle, XCircle, Search, Eye, CalendarPlus, X, Trash2 } from "lucide-react";
import { NavLink } from "../router-exports";

type Status = "Chờ duyệt" | "Đã phê duyệt" | "Từ chối";

const STATUS_CFG: Record<Status, { color: string; badge: string; icon: React.ElementType }> = {
  "Chờ duyệt": { color: "border-l-amber-400", badge: "bg-amber-100 text-amber-700", icon: Clock },
  "Đã phê duyệt": { color: "border-l-green-400", badge: "bg-green-100 text-green-700", icon: CheckCircle },
  "Từ chối": { color: "border-l-red-400", badge: "bg-red-100 text-red-700", icon: XCircle },
};

const MOCK_MY_BOOKINGS = [
  { maPhieu: "PDK001", maPhong: "A301", ngayLap: "2026-05-28", ngaySuDung: "2026-06-02", maCa: "Ca 3", lyDo: "Dạy bù môn CSDL – Lớp CNTT02", trangThai: "Chờ duyệt" as Status },
  { maPhieu: "PDK003", maPhong: "C101", ngayLap: "2026-05-26", ngaySuDung: "2026-05-31", maCa: "Ca 4", lyDo: "Họp nhóm đồ án, thực hành lập trình", trangThai: "Đã phê duyệt" as Status },
  { maPhieu: "PDK005", maPhong: "B201", ngayLap: "2026-05-29", ngaySuDung: "2026-06-05", maCa: "Ca 2", lyDo: "Hướng dẫn nghiên cứu khoa học sinh viên", trangThai: "Chờ duyệt" as Status },
  { maPhieu: "PDK006", maPhong: "A402", ngayLap: "2026-05-20", ngaySuDung: "2026-05-22", maCa: "Ca 1", lyDo: "Kiểm tra giữa kỳ môn Tin học đại cương", trangThai: "Từ chối" as Status, lyDoTuChoi: "Trùng với lịch bảo trì định kỳ của thiết bị phòng máy." },
  { maPhieu: "PDK007", maPhong: "B102", ngayLap: "2026-05-15", ngaySuDung: "2026-05-18", maCa: "Ca 5", lyDo: "Tổ chức sinh hoạt chuyên đề lớp học", trangThai: "Đã phê duyệt" as Status }
];

export function BookingHistoryPage() {
  const [bookings, setBookings] = useState(MOCK_MY_BOOKINGS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [selectedBooking, setSelectedBooking] = useState<typeof MOCK_MY_BOOKINGS[0] | null>(null);

  const filtered = bookings.filter((b) => {
    const matchSearch = b.maPhong.toLowerCase().includes(search.toLowerCase()) || b.maPhieu.toLowerCase().includes(search.toLowerCase()) || b.lyDo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Tất cả" || b.trangThai === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleCancelBooking = (maPhieu: string) => {
    if (confirm("Bạn có chắc chắn muốn hủy yêu cầu đặt phòng này?")) {
      setBookings(bookings.filter(b => b.maPhieu !== maPhieu));
      if (selectedBooking?.maPhieu === maPhieu) {
        setSelectedBooking(null);
      }
    }
  };

  const counts = {
    "Tất cả": bookings.length,
    "Chờ duyệt": bookings.filter(b => b.trangThai === "Chờ duyệt").length,
    "Đã phê duyệt": bookings.filter(b => b.trangThai === "Đã phê duyệt").length,
    "Từ chối": bookings.filter(b => b.trangThai === "Từ chối").length,
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Lịch sử đăng ký phòng của bạn</h2>
          <p className="text-purple-100 text-sm mt-1">Theo dõi, kiểm tra trạng thái phê duyệt và quản lý các yêu cầu mượn phòng học của bạn.</p>
        </div>
        <NavLink to="/booking" className="flex items-center gap-1.5 bg-white text-purple-700 hover:bg-purple-50 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
          <CalendarPlus size={16} /> Đăng ký mượn phòng mới
        </NavLink>
      </div>

      {/* Stats Quick Filter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["Tất cả", "Chờ duyệt", "Đã phê duyệt", "Từ chối"] as const).map((s) => {
          let style = "border-slate-200 hover:border-purple-300";
          let badgeColor = "bg-slate-100 text-slate-700";
          if (filterStatus === s) {
            style = "border-purple-500 bg-purple-50/20";
          }
          if (s === "Chờ duyệt") badgeColor = "bg-amber-100 text-amber-700";
          if (s === "Đã phê duyệt") badgeColor = "bg-green-100 text-green-700";
          if (s === "Từ chối") badgeColor = "bg-red-100 text-red-700";

          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`bg-white rounded-xl border-2 p-4 text-left shadow-sm transition-all ${style}`}
            >
              <div className="text-xs text-slate-500 font-medium mb-1">{s}</div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-800">{counts[s]}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badgeColor}`}>Phiếu</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List of bookings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-semibold text-slate-800 text-sm">Danh sách yêu cầu</h3>
            <div className="relative">
              <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm mã phiếu, phòng, lý do..."
                className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-60"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto max-h-[500px]">
            {filtered.map((b) => {
              const cfg = STATUS_CFG[b.trangThai];
              const Icon = cfg.icon;
              return (
                <div
                  key={b.maPhieu}
                  onClick={() => setSelectedBooking(b)}
                  className={`p-4 hover:bg-slate-50/80 cursor-pointer transition-all flex items-center justify-between gap-4 border-l-4 ${cfg.color} ${selectedBooking?.maPhieu === b.maPhieu ? "bg-purple-50/20" : ""}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">{b.maPhieu}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.badge}`}>
                        <Icon size={10} /> {b.trangThai}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      Phòng: <span className="text-purple-700 font-bold">{b.maPhong}</span> • {b.ngaySuDung} ({b.maCa})
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{b.lyDo}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(b);
                      }}
                      className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                      title="Xem chi tiết"
                    >
                      <Eye size={15} />
                    </button>
                    {b.trangThai === "Chờ duyệt" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelBooking(b.maPhieu);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Hủy yêu cầu"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-sm">
                Không tìm thấy yêu cầu đặt phòng nào phù hợp.
              </div>
            )}
          </div>
        </div>

        {/* Booking Details sidebar panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          {selectedBooking ? (
            <div className="flex flex-col h-full">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 text-sm">Chi tiết Phiếu mượn</h3>
                <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>
              <div className="p-5 flex-1 space-y-4 text-xs">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mã phiếu:</span>
                    <span className="font-mono font-bold text-slate-700">{selectedBooking.maPhieu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ngày làm đơn:</span>
                    <span className="font-semibold text-slate-700">{selectedBooking.ngayLap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trạng thái:</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${STATUS_CFG[selectedBooking.trangThai].badge}`}>
                      {selectedBooking.trangThai}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-500 mb-1">Phòng đăng ký:</label>
                    <div className="text-sm font-bold text-slate-800 bg-purple-50/50 rounded-lg p-2 border border-purple-100">
                      {selectedBooking.maPhong}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-500 mb-1">Ngày sử dụng:</label>
                      <div className="font-medium text-slate-800 bg-slate-50 rounded-lg p-2 border border-slate-200">
                        {selectedBooking.ngaySuDung}
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Ca học đăng ký:</label>
                      <div className="font-medium text-slate-800 bg-slate-50 rounded-lg p-2 border border-slate-200">
                        {selectedBooking.maCa}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Lý do đăng ký mượn:</label>
                    <div className="text-slate-700 bg-slate-50 rounded-lg p-2 border border-slate-200 whitespace-pre-line leading-relaxed">
                      {selectedBooking.lyDo}
                    </div>
                  </div>
                  {selectedBooking.trangThai === "Từ chối" && selectedBooking.lyDoTuChoi && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <label className="block text-red-800 font-semibold mb-1">Lý do từ chối phê duyệt:</label>
                      <p className="text-red-700 leading-relaxed font-medium">{selectedBooking.lyDoTuChoi}</p>
                    </div>
                  )}
                </div>

                {selectedBooking.trangThai === "Chờ duyệt" && (
                  <button
                    onClick={() => handleCancelBooking(selectedBooking.maPhieu)}
                    className="w-full mt-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Trash2 size={14} /> Hủy yêu cầu đăng ký
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center h-full min-h-[300px]">
              <Eye size={36} className="text-slate-300 mb-2" />
              <p className="text-xs">Chọn một phiếu trong danh sách bên cạnh để xem thông tin chi tiết đầy đủ.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
