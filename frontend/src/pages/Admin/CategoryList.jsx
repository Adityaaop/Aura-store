import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";
import { FiTag, FiEdit2 } from "react-icons/fi";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`Category "${result.name}" created!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed. Please try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Category "${result.name}" updated!`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed. Try again.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Category "${result.name}" deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
      <AdminMenu />

      <div className="pb-4 mb-8 border-b border-white/10">
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
          Taxonomy & Organization
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Manage Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Create Category Form */}
        <div className="md:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
          <div className="flex items-center space-x-2 text-white font-bold mb-4">
            <FiTag className="text-indigo-400" />
            <span>Add New Category</span>
          </div>

          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
            buttonText="Add Category"
          />
        </div>

        {/* Existing Categories Pill List */}
        <div className="md:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Active Categories ({categories?.length || 0})
            </span>
            <span className="text-xs text-slate-500">Click to edit/delete</span>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {categories?.map((category) => (
              <button
                key={category._id}
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-indigo-600/20 text-slate-200 hover:text-indigo-300 border border-white/10 hover:border-indigo-500/30 text-xs font-semibold transition-all group"
              >
                <span>{category.name}</span>
                <FiEdit2 size={12} className="text-slate-500 group-hover:text-indigo-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2">Edit Category</h3>
          <p className="text-xs text-slate-400 mb-4">Update the display name or remove this category.</p>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CategoryList;
