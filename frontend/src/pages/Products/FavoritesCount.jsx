import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites?.length || 0;

  if (favoriteCount === 0) return null;

  return (
    <span className="px-1.5 py-0.2 text-[10px] font-bold text-white bg-rose-500 rounded-full shadow-md">
      {favoriteCount}
    </span>
  );
};

export default FavoritesCount;
