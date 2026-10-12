import { useState } from "react";
import MenuList from "../../components/MenuList";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const {
    data: dishes,
    isLoading,
    error,
  } = useFetch(
    import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL}/api/menu`
      : "/menu.json"
  );

  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Failed to load menu: {error}</p>;
  }

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <section>
      <h2>CampusEats Menu</h2>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search dishes..."
      />

      <MenuList dishes={filteredDishes} />
    </section>
  );
}

export default MenuPage;