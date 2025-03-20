const getPagination = (page, size) => {
  const limit = size ? +size : 9;
  const offset = page > 1 ? (page - 1) * limit : 0; // ✅ Виправлений offset
  return { limit, offset };
};
export default getPagination;
