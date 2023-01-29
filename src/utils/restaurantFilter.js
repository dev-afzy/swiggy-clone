export function filterRestaurants(search) {
  return this?.filter((item) =>
    item.data.name.toLowerCase().includes(search.toLowerCase())
  );
}