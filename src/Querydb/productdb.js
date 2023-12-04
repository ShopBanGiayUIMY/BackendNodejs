const Queryproduct = {
  GetListProducts: `
  SELECT
  p.product_id,
  p.product_name,
  p.product_price,
  p.product_description,
  p.thumbnail,
  SUM(od.quantity) AS total_quantity_sold
FROM
  products p
LEFT JOIN
  product_details pd ON p.product_id = pd.product_id
LEFT JOIN
  order_details od ON pd.detail_id = od.product_detail_id
GROUP BY
  p.product_id
ORDER BY
  total_quantity_sold DESC;
    `,
  GetSolidProductById: `
  SELECT
  SUM(od.quantity) AS total_quantity_sold
FROM
  products p
JOIN
  product_details pd ON p.product_id = pd.product_id
LEFT JOIN
  order_details od ON pd.detail_id = od.product_detail_id
WHERE
  p.product_id = ?
GROUP BY
  p.product_id, pd.detail_id
ORDER BY
  total_quantity_sold DESC;
    `,
  
};

export default Queryproduct;
