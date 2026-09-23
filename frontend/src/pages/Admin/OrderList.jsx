import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import moment from "moment";
import { FiExternalLink } from "react-icons/fi";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <AdminMenu />

      <div className="pb-4 mb-8 border-b border-white/10">
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
          Fulfillment & Logistics
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Customer Orders</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : orders?.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-white/10">
          <p className="text-slate-400">No customer orders placed yet.</p>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-4 px-6">Product Item</th>
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Total</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6">Delivery</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#0c0e17] border border-white/10 shrink-0">
                        {order.orderItems?.[0]?.image ? (
                          <img
                            src={order.orderItems[0].image}
                            alt={order._id}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-800" />
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-xs text-slate-400">
                      {order._id.substring(0, 10)}...
                    </td>

                    <td className="py-4 px-6 font-semibold text-white">
                      {order.user ? order.user.username : "Guest"}
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-400">
                      {moment(order.createdAt).format("MMM DD, YYYY")}
                    </td>

                    <td className="py-4 px-6 font-bold text-white">
                      ${order.totalPrice?.toFixed(2)}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.isPaid
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.isDelivered
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Link
                        to={`/order/${order._id}`}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all"
                      >
                        <span>Inspect</span>
                        <FiExternalLink size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
