const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          placeholder="Enter category name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between items-center gap-3">
          <button className="gradient-btn px-6 py-2.5 rounded-xl text-white font-semibold text-sm shadow-md hover:shadow-indigo-500/25 transition-all">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-5 py-2.5 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/30 font-semibold text-sm transition-all"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
