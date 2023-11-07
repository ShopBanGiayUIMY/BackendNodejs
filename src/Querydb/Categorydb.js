const QueryCategory = {
  getallCategory: `select * from categories`,
  getCategorybyid: `SELECT products.*,categories.name as category_name
FROM categories
JOIN products ON categories.category_id = products.category_id
WHERE categories.category_id = ?`,

};

export default QueryCategory;
