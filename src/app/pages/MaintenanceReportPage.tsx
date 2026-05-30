import { useState } from "react";
import { BarChart3, PieChart, TrendingUp, AlertTriangle, Printer, Download, Calendar, DollarSign, Tool, ShieldAlert, FileText } from "lucide-react";

export function MaintenanceReportPage() {
  const [selectedTime, setSelectedTime] = useState("Tháng này");

  // Mock statistics data
  const kpis = [
    { label: "Tổng chi phí bảo trì", value: "4,900,000 ₫", change: "+12% so với tháng trước", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Số lượng sự cố tiếp nhận", value: "32 đơn", change: "-8% cải thiện giảm sự cố", icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Tỷ lệ khắc phục xong", value: "87.5 %", change: "Thời gian xử lý TB: 4.2 giờ", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Hạng mục đang bảo trì", value: "3 thiết bị", change: "2 hạng mục trễ hạn", icon: BarChart3, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const buildingCosts = [
    { name: "Tòa A – Hiệu bộ", cost: 1200000, percentage: 24, count: 4, color: "bg-blue-600" },
    { name: "Tòa B – Giảng đường chính", cost: 1850000, percentage: 38, count: 6, color: "bg-purple-600" },
    { name: "Tòa C – Thực hành Công nghệ", cost: 1400000, percentage: 28, count: 3, color: "bg-teal-600" },
    { name: "Tòa D – Thư viện & NCKH", cost: 450000, percentage: 10, count: 2, color: "bg-amber-600" },
  ];

  const incidentTypes = [
    { type: "Máy chiếu", count: 14, rate: 43 },
    { type: "Điều hòa", count: 9, rate: 28 },
    { type: "Hệ thống loa", count: 6, rate: 19 },
    { type: "Thiết bị điện & Máy tính", count: 3, rate: 10 },
  ];

  const topBrokenEquipment = [
    { maThietBi: "TB004", tenThietBi: "Loa hội trường Soundking", maPhong: "C101", soLanHong: 4, chiPhiLuyKe: 1200000, trangThaiHienTai: "Đang bảo trì" },
    { maThietBi: "TB001", tenThietBi: "Máy chiếu Panasonic VX610", maPhong: "A301", soLanHong: 3, chiPhiLuyKe: 2500000, trangThaiHienTai: "Hoạt động tốt" },
    { maThietBi: "TB002", tenThietBi: "Điều hòa Daikin 24000 BTU", maPhong: "A301", soLanHong: 2, chiPhiLuyKe: 750000, trangThaiHienTai: "Hoạt động tốt" },
    { maThietBi: "TB006", tenThietBi: "Điều hòa Panasonic 18000 BTU", maPhong: "B201", soLanHong: 1, chiPhiLuyKe: 450000, trangThaiHienTai: "Hoạt động tốt" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Controls Row */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">Thống kê Báo cáo Bảo trì & Sự cố</h2>
          <p className="text-xs text-slate-500 mt-0.5">Phân tích tần suất báo lỗi thiết bị, tỷ lệ xử lý và chi phí giảng đường HUMG</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="relative">
            <Calendar size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none bg-white text-slate-700"
            >
              <option>Tháng này</option>
              <option>Học kỳ này</option>
              <option>Năm học này</option>
            </select>
          </div>
          <button onClick={() => alert("Đang kết nối máy in...")} className="p-1.5 text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg bg-white" title="In báo cáo">
            <Printer size={15} />
          </button>
          <button onClick={() => alert("Đang tải xuống báo cáo tổng hợp...")} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">
            <Download size={14} /> Xuất báo cáo
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-32">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">{kpi.label}</span>
                <div className={`w-8 h-8 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center`}><Icon size={16} /></div>
              </div>
              <div className="mt-2">
                <div className="text-lg font-bold text-slate-800">{kpi.value}</div>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">{kpi.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost by Building (Pure CSS bar chart) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 text-sm mb-4 flex items-center gap-1.5"><DollarSign size={16} className="text-emerald-500" /> Chi phí bảo trì theo Tòa nhà</h3>
          <div className="space-y-4">
            {buildingCosts.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.name}</span>
                  <span>{item.cost.toLocaleString("vi-VN")} ₫ ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all duration-500`} style={{ width: `${item.percentage}%` }}></div>
                </div>
                <span className="text-[9px] text-slate-400 font-bold block">Tổng số thiết bị bảo trì: {item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents by Equipment Type (Distribution layout) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 text-sm mb-4 flex items-center gap-1.5"><AlertTriangle size={16} className="text-rose-500" /> Phân bố sự cố hỏng hóc theo loại thiết bị</h3>
          <div className="space-y-3.5">
            {incidentTypes.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 font-semibold w-36 shrink-0">{item.type}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${item.rate}%` }}></div>
                </div>
                <span className="text-xs font-bold text-slate-800 w-16 text-right shrink-0">{item.count} vụ ({item.rate}%)</span>
              </div>
            ))}
            <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-3 flex items-start gap-2.5 mt-2">
              <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-rose-800 leading-relaxed">
                <strong>Nhận định kỹ thuật:</strong> Thiết bị <strong>Máy chiếu</strong> chiếm tỷ lệ báo lỗi cao nhất. Đề xuất tăng cường lịch bảo dưỡng vệ sinh bóng đèn định kỳ mỗi học kỳ để giảm thiểu sự cố trong giờ giảng dạy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Broken Equipment Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5"><FileText size={16} className="text-blue-500" /> Thiết bị có tần suất báo hỏng nhiều nhất</h3>
          <span className="text-[10px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded">Thống kê lũy kế</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase">
                <th className="py-3 px-4">Mã TB</th>
                <th className="py-3 px-4">Tên thiết bị</th>
                <th className="py-3 px-4">Vị trí phòng học</th>
                <th className="py-3 px-4 text-center">Số lần hỏng</th>
                <th className="py-3 px-4">Chi phí lũy kế</th>
                <th className="py-3 px-4">Trạng thái hiện tại</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {topBrokenEquipment.map((eq) => (
                <tr key={eq.maThietBi} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-500">{eq.maThietBi}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{eq.tenThietBi}</td>
                  <td className="py-3 px-4"><span className="bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded border border-purple-100">{eq.maPhong}</span></td>
                  <td className="py-3 px-4 text-center font-bold text-rose-600">{eq.soLanHong} lần</td>
                  <td className="py-3 px-4 font-bold text-slate-850">{eq.chiPhiLuyKe.toLocaleString("vi-VN")} ₫</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full font-semibold ${
                      eq.trangThaiHienTai === "Hoạt động tốt" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {eq.trangThaiHienTai}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
