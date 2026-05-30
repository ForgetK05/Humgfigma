import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Building2,
  DoorOpen,
  Users,
  CalendarCheck,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Printer,
  RefreshCw,
  BookOpen,
  GraduationCap,
  Cpu,
  PieChart,
  Activity,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react";

// ─── Mock summary data ──────────────────────────────────────────────────────

const SUMMARY_KPIS = [
  {
    label: "Tổng phòng học",
    value: "18",
    sub: "Toàn khuôn viên HUMG",
    icon: DoorOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    trend: null,
    trendText: "",
  },
  {
    label: "Phòng đang hoạt động",
    value: "15",
    sub: "3 phòng đang bảo trì",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    trend: "up",
    trendText: "+2 phòng so với kỳ trước",
  },
  {
    label: "Lớp học phần",
    value: "36",
    sub: "Học kỳ II – 2025–2026",
    icon: GraduationCap,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    trend: "up",
    trendText: "+4 lớp so với kỳ trước",
  },
  {
    label: "Lịch đã xếp",
    value: "124",
    sub: "87% tỷ lệ lấp đầy phòng",
    icon: CalendarCheck,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    trend: "up",
    trendText: "+18 tiết so với kỳ trước",
  },
  {
    label: "Thiết bị đang quản lý",
    value: "42",
    sub: "6 thiết bị cần chú ý",
    icon: Cpu,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    trend: "down",
    trendText: "6 thiết bị hỏng/bảo trì",
  },
  {
    label: "Sự cố tháng này",
    value: "32",
    sub: "87.5% đã được khắc phục",
    icon: AlertTriangle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    trend: "down",
    trendText: "−8% cải thiện so với tháng trước",
  },
  {
    label: "Chi phí bảo trì",
    value: "4,9M ₫",
    sub: "Tháng 05/2026",
    icon: DollarSign,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    trend: "up",
    trendText: "+12% so với tháng trước",
  },
  {
    label: "Đặt phòng đã duyệt",
    value: "28",
    sub: "7 yêu cầu chờ phê duyệt",
    icon: CalendarCheck,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    trend: "up",
    trendText: "+5 yêu cầu so với tuần trước",
  },
];

const ROOM_UTILIZATION = [
  { name: "Tòa A – Hiệu bộ", total: 6, active: 6, utilization: 100, maintenance: 0, color: "bg-blue-500" },
  { name: "Tòa B – Giảng đường chính", total: 8, active: 6, utilization: 75, maintenance: 2, color: "bg-purple-500" },
  { name: "Tòa C – Thực hành CN", total: 5, active: 4, utilization: 80, maintenance: 1, color: "bg-teal-500" },
  { name: "Tòa D – Thư viện & NCKH", total: 4, active: 3, utilization: 75, maintenance: 0, color: "bg-amber-500" },
];

const WEEKLY_BOOKING = [
  { day: "T2", slots: 18, capacity: 20 },
  { day: "T3", slots: 22, capacity: 20 },
  { day: "T4", slots: 16, capacity: 20 },
  { day: "T5", slots: 19, capacity: 20 },
  { day: "T6", slots: 21, capacity: 20 },
  { day: "T7", slots: 12, capacity: 20 },
  { day: "CN", slots: 4, capacity: 20 },
];

const INCIDENT_TREND = [
  { month: "T1", count: 8 },
  { month: "T2", count: 12 },
  { month: "T3", count: 15 },
  { month: "T4", count: 10 },
  { month: "T5", count: 32 },
];

const TOP_ROOMS = [
  { room: "B201", building: "Tòa B", bookings: 28, rate: 95, status: "Cao" },
  { room: "A301", building: "Tòa A", bookings: 24, rate: 87, status: "Cao" },
  { room: "C101", building: "Tòa C", bookings: 19, rate: 72, status: "Trung bình" },
  { room: "D401", building: "Tòa D", bookings: 11, rate: 45, status: "Thấp" },
  { room: "B305", building: "Tòa B", bookings: 8, rate: 32, status: "Thấp" },
];

const ACTIVITY_FEED = [
  { time: "08:32", event: "Phòng A301 – Lớp CNTT01 bắt đầu ca học", type: "info" },
  { time: "09:15", event: "BC004: Máy tính D401 báo hỏng khẩn cấp, chờ tiếp nhận", type: "danger" },
  { time: "10:00", event: "BT003: Lập kế hoạch thay bóng máy chiếu A301 (06/06)", type: "warning" },
  { time: "11:20", event: "Yêu cầu đặt phòng C102 – 31/05 được phê duyệt", type: "success" },
  { time: "14:05", event: "BC002: Loa hội trường C101 – Nhà cung cấp đến kiểm tra", type: "warning" },
  { time: "15:30", event: "BT001: Hoàn thành bảo trì điều hòa A301, xác nhận đưa vào dùng", type: "success" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Tháng này");

  const maxBooking = Math.max(...WEEKLY_BOOKING.map((d) => d.slots));
  const maxIncident = Math.max(...INCIDENT_TREND.map((d) => d.count));

  return (
    <div className="space-y-6">
      {/* ── Header Banner ── */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shadow-inner">
            <BarChart3 size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Báo cáo Tổng hợp Hệ thống</h2>
            <p className="text-blue-100 text-xs mt-1 font-medium">
              Tổng quan toàn diện: phòng học, thiết bị, đặt phòng & bảo trì – Trường ĐH Mỏ – Địa chất (HUMG)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-white/15 border border-white/25 text-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none backdrop-blur-sm cursor-pointer"
          >
            <option className="text-slate-800">Tháng này</option>
            <option className="text-slate-800">Học kỳ này</option>
            <option className="text-slate-800">Năm học 2025–2026</option>
          </select>
          <button
            onClick={() => alert("Đang kết nối máy in...")}
            className="p-2 bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl text-white transition-colors"
            title="In báo cáo"
          >
            <Printer size={16} />
          </button>
          <button
            onClick={() => alert("Đang xuất báo cáo tổng hợp PDF...")}
            className="flex items-center gap-1.5 bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            <Download size={15} /> Xuất PDF
          </button>
        </div>
      </div>

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SUMMARY_KPIS.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`bg-white rounded-xl border ${kpi.border} p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-semibold leading-tight">{kpi.label}</span>
                <div className={`w-8 h-8 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center shrink-0`}>
                  <Icon size={15} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800 leading-none">{kpi.value}</div>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">{kpi.sub}</p>
              </div>
              {kpi.trend && (
                <div
                  className={`flex items-center gap-1 text-[10px] font-semibold ${
                    kpi.trend === "up" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {kpi.trend === "up" ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  {kpi.trendText}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Room Utilization by Building */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 lg:col-span-2">
          <h3 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
            <Building2 size={16} className="text-blue-500" /> Tỷ lệ sử dụng phòng học theo Tòa nhà
          </h3>
          <p className="text-[11px] text-slate-400 mb-5">Số phòng đang hoạt động / Tổng số phòng trong từng tòa</p>
          <div className="space-y-5">
            {ROOM_UTILIZATION.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.name}</span>
                  <span className="text-slate-500">
                    {item.active}/{item.total} phòng &nbsp;·&nbsp;
                    <span className={item.utilization >= 90 ? "text-emerald-600" : item.utilization >= 70 ? "text-amber-600" : "text-rose-600"}>
                      {item.utilization}%
                    </span>
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${item.utilization}%` }}
                  />
                </div>
                {item.maintenance > 0 && (
                  <span className="text-[10px] text-amber-600 font-semibold">
                    ⚠ {item.maintenance} phòng đang bảo trì
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Incident Trend (mini bar chart) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
            <Activity size={16} className="text-rose-500" /> Xu hướng Sự cố
          </h3>
          <p className="text-[11px] text-slate-400 mb-5">Số sự cố báo cáo theo từng tháng</p>
          <div className="flex items-end gap-2 h-40 pb-1">
            {INCIDENT_TREND.map((d, idx) => {
              const heightPct = maxIncident > 0 ? (d.count / maxIncident) * 100 : 0;
              const isMax = d.count === maxIncident;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-[10px] font-bold ${isMax ? "text-rose-600" : "text-slate-500"}`}>
                    {d.count}
                  </span>
                  <div className="w-full flex items-end" style={{ height: "120px" }}>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ${isMax ? "bg-rose-500" : "bg-rose-200"}`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-[10px] text-slate-400 border-t border-slate-100 pt-3">
            Tháng 5 ghi nhận số sự cố cao nhất. Đề xuất tăng cường kiểm tra định kỳ.
          </div>
        </div>
      </div>

      {/* ── Weekly Booking & Top Rooms ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Weekly Schedule Load */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
            <CalendarCheck size={16} className="text-purple-500" /> Phân bổ lịch học theo ngày trong tuần
          </h3>
          <p className="text-[11px] text-slate-400 mb-5">Số tiết học được sắp xếp mỗi ngày (so với năng lực 20 tiết)</p>
          <div className="flex items-end gap-2 h-40 pb-1">
            {WEEKLY_BOOKING.map((d, idx) => {
              const heightPct = maxBooking > 0 ? (d.slots / maxBooking) * 100 : 0;
              const overCapacity = d.slots > d.capacity;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-[10px] font-bold ${overCapacity ? "text-rose-600" : "text-purple-600"}`}>
                    {d.slots}
                  </span>
                  <div className="w-full flex items-end" style={{ height: "120px" }}>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ${overCapacity ? "bg-rose-400" : "bg-purple-400"}`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{d.day}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] border-t border-slate-100 pt-3">
            <span className="flex items-center gap-1 text-purple-600">
              <span className="w-3 h-3 rounded bg-purple-400 inline-block" /> Bình thường
            </span>
            <span className="flex items-center gap-1 text-rose-600">
              <span className="w-3 h-3 rounded bg-rose-400 inline-block" /> Vượt ngưỡng
            </span>
          </div>
        </div>

        {/* Top Used Rooms */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-500" /> Top phòng được đặt nhiều nhất
          </h3>
          <p className="text-[11px] text-slate-400 mb-4">Tổng số lượt đặt phòng trong tháng</p>
          <div className="space-y-3">
            {TOP_ROOMS.map((r, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 w-4">{idx + 1}</span>
                <div className="flex flex-col w-20 shrink-0">
                  <span className="font-bold text-xs text-slate-800">{r.room}</span>
                  <span className="text-[10px] text-slate-400">{r.building}</span>
                </div>
                <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      r.rate >= 80 ? "bg-emerald-500" : r.rate >= 50 ? "bg-amber-400" : "bg-rose-400"
                    }`}
                    style={{ width: `${r.rate}%` }}
                  />
                </div>
                <div className="text-right w-20 shrink-0">
                  <span className="text-xs font-bold text-slate-700">{r.bookings} lượt</span>
                  <span
                    className={`block text-[10px] font-semibold ${
                      r.status === "Cao" ? "text-emerald-600" : r.status === "Trung bình" ? "text-amber-600" : "text-rose-500"
                    }`}
                  >
                    {r.rate}% – {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Status Summary + Activity Feed ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Equipment & Maintenance Summary */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
            <Wrench size={16} className="text-amber-500" /> Tổng quan Thiết bị & Bảo trì
          </h3>
          <div className="space-y-3">
            {[
              { label: "Thiết bị hoạt động tốt", value: 36, total: 42, color: "bg-emerald-500", text: "text-emerald-700" },
              { label: "Đang bảo trì", value: 3, total: 42, color: "bg-amber-400", text: "text-amber-700" },
              { label: "Hỏng chờ xử lý", value: 3, total: 42, color: "bg-rose-500", text: "text-rose-700" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <span className={`font-bold ${item.text}`}>{item.value} / {item.total}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${(item.value / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            {[
              { label: "Kế hoạch bảo trì tháng này", value: "4 phiếu", icon: Clock, color: "text-blue-600" },
              { label: "Tổng chi phí bảo trì", value: "4,900,000 ₫", icon: DollarSign, color: "text-emerald-600" },
              { label: "Sự cố chờ tiếp nhận", value: "2 vụ", icon: AlertTriangle, color: "text-rose-600" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Icon size={12} className={item.color} />{item.label}
                  </span>
                  <span className={`font-bold ${item.color}`}>{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Status Pie Summary */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
            <PieChart size={16} className="text-purple-500" /> Trạng thái đặt phòng (tháng này)
          </h3>
          <div className="space-y-3 mt-2">
            {[
              { label: "Đã phê duyệt", count: 28, pct: 74, color: "bg-emerald-500", text: "text-emerald-700" },
              { label: "Chờ phê duyệt", count: 7, pct: 18, color: "bg-amber-400", text: "text-amber-700" },
              { label: "Bị từ chối", count: 3, pct: 8, color: "bg-rose-500", text: "text-rose-700" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                <span className="text-xs text-slate-600 flex-1 font-medium">{item.label}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
                <span className={`text-xs font-bold w-16 text-right ${item.text}`}>{item.count} ({item.pct}%)</span>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-3">
            <p className="text-[11px] text-blue-800 leading-relaxed">
              <strong>Ghi nhận:</strong> Tháng 5/2026 ghi nhận 38 yêu cầu đặt phòng ngoài giờ, tăng 15% so với tháng trước. Tòa B dẫn đầu với 14 yêu cầu.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
            {[
              { label: "Tổng yêu cầu", value: "38", icon: BookOpen },
              { label: "Lượt sử dụng TB/ngày", value: "5.4", icon: Clock },
              { label: "Phòng có yêu cầu nhất", value: "B201", icon: DoorOpen },
              { label: "Tỷ lệ duyệt", value: "74%", icon: CheckCircle2 },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Icon size={10} className="text-slate-400" />{item.label}
                  </span>
                  <span className="text-sm font-bold text-slate-800">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Activity size={16} className="text-blue-500" /> Hoạt động gần đây
            </h3>
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <RefreshCw size={9} className="animate-spin" /> Live
            </span>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto max-h-64">
            {ACTIVITY_FEED.map((item, idx) => {
              const dotColor =
                item.type === "danger"
                  ? "bg-rose-500"
                  : item.type === "warning"
                  ? "bg-amber-400"
                  : item.type === "success"
                  ? "bg-emerald-500"
                  : "bg-blue-400";
              const textColor =
                item.type === "danger"
                  ? "text-rose-700"
                  : item.type === "warning"
                  ? "text-amber-700"
                  : item.type === "success"
                  ? "text-emerald-700"
                  : "text-slate-600";
              return (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="flex flex-col items-center shrink-0 pt-0.5">
                    <div className={`w-2 h-2 rounded-full ${dotColor} shrink-0`} />
                    {idx < ACTIVITY_FEED.length - 1 && (
                      <div className="w-px flex-1 bg-slate-100 mt-1" style={{ minHeight: "16px" }} />
                    )}
                  </div>
                  <div className="flex-1 pb-1">
                    <p className={`text-[11px] leading-relaxed font-medium ${textColor}`}>{item.event}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{item.time} – Hôm nay</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button className="w-full text-[11px] text-blue-600 hover:text-blue-800 font-semibold transition-colors">
              Xem toàn bộ lịch sử hoạt động →
            </button>
          </div>
        </div>
      </div>

      {/* ── System Health Footer ── */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-6 border border-slate-700 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-base font-bold">Tình trạng Hệ thống Tổng thể</h3>
            <p className="text-slate-400 text-xs mt-1">Đánh giá sức khoẻ vận hành các phân hệ trong tháng 05/2026</p>
          </div>
          <span className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold">
            <CheckCircle2 size={14} /> Hệ thống vận hành bình thường
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Phân hệ Phòng học", pct: 92, color: "bg-emerald-500", note: "Hoạt động tốt" },
            { label: "Phân hệ Đặt phòng", pct: 88, color: "bg-blue-500", note: "Ổn định" },
            { label: "Phân hệ Thiết bị", pct: 79, color: "bg-amber-400", note: "Cần chú ý" },
            { label: "Phân hệ Bảo trì", pct: 87, color: "bg-purple-500", note: "Hoạt động tốt" },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">{item.label}</span>
                <span className="font-bold text-white">{item.pct}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
