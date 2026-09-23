import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <AdminMenu />

      <div className="pb-4 mb-8 border-b border-white/10">
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
          Access & Credentials
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Manage Users</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-4 px-6">User ID</th>
                  <th className="py-4 px-6">Username</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {users?.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">
                      {user._id.substring(0, 10)}...
                    </td>

                    <td className="py-4 px-6 font-semibold text-white">
                      {editableUserId === user._id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) => setEditableUserName(e.target.value)}
                            className="px-3 py-1.5 rounded-lg bg-[#0a0c14] border border-white/15 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                            title="Save"
                          >
                            <FaCheck size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>{user.username}</span>
                          <button
                            onClick={() => toggleEdit(user._id, user.username, user.email)}
                            className="text-slate-500 hover:text-indigo-400 transition-colors"
                            title="Edit Username"
                          >
                            <FaEdit size={12} />
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      {editableUserId === user._id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="email"
                            value={editableUserEmail}
                            onChange={(e) => setEditableUserEmail(e.target.value)}
                            className="px-3 py-1.5 rounded-lg bg-[#0a0c14] border border-white/15 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                            title="Save"
                          >
                            <FaCheck size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <a
                            href={`mailto:${user.email}`}
                            className="text-slate-300 hover:text-indigo-400 transition-colors"
                          >
                            {user.email}
                          </a>
                          <button
                            onClick={() => toggleEdit(user._id, user.username, user.email)}
                            className="text-slate-500 hover:text-indigo-400 transition-colors"
                            title="Edit Email"
                          >
                            <FaEdit size={12} />
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isAdmin
                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                        }`}
                      >
                        {user.isAdmin ? "Administrator" : "Customer"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      {!user.isAdmin ? (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                          title="Delete user"
                        >
                          <FaTrash size={14} />
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 italic pr-2">Protected</span>
                      )}
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

export default UserList;
