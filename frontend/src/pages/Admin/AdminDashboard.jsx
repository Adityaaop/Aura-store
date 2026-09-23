import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { FiDollarSign, FiUsers, FiShoppingBag, FiTrendingUp } from "react-icons/fi";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "area",
        toolbar: { show: false },
        background: "transparent",
      },
      theme: { mode: "dark" },
      tooltip: {
        theme: "dark",
        style: { fontSize: "12px" },
        y: {
          formatter: (val) => `$${val?.toFixed ? val.toFixed(2) : val}`,
        },
      },
      colors: ["#6366f1"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.05,
          stops: [0, 90, 100],
        },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      grid: {
        borderColor: "rgba(255, 255, 255, 0.06)",
        strokeDashArray: 4,
      },
      xaxis: {
        categories: [],
        labels: {
          style: { colors: "#94a3b8", fontSize: "11px" },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: { colors: "#94a3b8", fontSize: "11px" },
          formatter: (val) => `$${val}`,
        },
        min: 0,
      },
    },
    series: [{ name: "Daily Revenue", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Daily Revenue", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <AdminMenu />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            Executive Analytics
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Admin Dashboard</h1>
        </div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Store Analytics</span>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Sales */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">Total Revenue</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {isLoading ? (
                  <Loader />
                ) : (
                  `$${sales?.totalSales ? sales.totalSales.toFixed(2) : "0.00"}`
                )}
              </h3>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <FiDollarSign size={22} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-xs text-indigo-400 font-medium">
            <FiTrendingUp className="mr-1.5" />
            <span>Lifetime Gross Volume</span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">Registered Users</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {loadingCustomers ? <Loader /> : customers?.length || 0}
              </h3>
            </div>
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <FiUsers size={22} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-xs text-cyan-400 font-medium">
            <span>Verified accounts</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">Total Orders</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {loadingOrders ? <Loader /> : orders?.totalOrders || 0}
              </h3>
            </div>
            <div className="p-3.5 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20 group-hover:scale-110 transition-transform">
              <FiShoppingBag size={22} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-xs text-violet-400 font-medium">
            <span>Fulfilled & pending shipments</span>
          </div>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Revenue Timeline</h3>
            <p className="text-xs text-slate-400">Performance aggregated across order timestamps</p>
          </div>
        </div>

        <div className="pt-4">
          <Chart
            options={state.options}
            series={state.series}
            type="area"
            height={320}
            width="100%"
          />
        </div>
      </div>

      {/* Orders List Section */}
      <div className="pt-4">
        <OrderList />
      </div>
    </div>
  );
};

export default AdminDashboard;
