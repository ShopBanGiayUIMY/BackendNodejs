const Querycart = {
  // Get total items in cart for a user.
  //   getCartUsers: `SELECT
  //     c.cart_id AS 'id',
  //     p.product_id AS 'id',
  //     p.product_name AS 'title',
  //     p.product_price AS 'price',
  //     ci.quantity AS 'quantity',
  //     pd.color AS 'color',
  //     pd.size AS 'size',
  //     pd.stock AS 'stock',
  //     (p.product_price * ci.quantity) AS 'total',
  //     p.discount_percentage AS 'discountPercentage',
  //     (p.product_price * ci.quantity * (1 - (p.discount_percentage / 100))) AS 'discountedTotal',
  //     p.thumbnail
  // FROM carts c
  // JOIN cart_items ci ON c.cart_id = ci.cart_id
  // JOIN product_details pd ON ci.product_detail_id = pd.detail_id
  // JOIN products p ON pd.product_id = p.product_id
  // WHERE c.user_id = ?;`,
  getCartUsers: `
SELECT 
    ci.cart_id AS cartId,
    p.product_id AS id,
    pd.detail_id AS productDetailId,  
    p.product_name AS title,
    p.product_price AS price,
    ci.quantity AS quantity,
    ci.item_id AS itemId,
    pd.color AS color,
    pd.size AS size,
    pd.stock AS stock,
    (p.product_price * ci.quantity) AS total,
    p.discount_percentage AS discountPercentage,
    (p.product_price * ci.quantity * (1 - (p.discount_percentage / 100))) AS discountedTotal,
    p.thumbnail,
    SUM(p.product_price * ci.quantity) OVER (PARTITION BY c.cart_id) AS cartTotal,
    SUM(p.product_price * ci.quantity * (1 - (p.discount_percentage / 100))) OVER (PARTITION BY c.cart_id) AS cartDiscountedTotal,
    COUNT(*) OVER (PARTITION BY c.cart_id) AS totalProducts,
    SUM(ci.quantity) OVER (PARTITION BY c.cart_id) AS totalQuantity
FROM carts c
JOIN cart_items ci ON c.cart_id = ci.cart_id
JOIN product_details pd ON ci.product_detail_id = pd.detail_id
JOIN products p ON pd.product_id = p.product_id
WHERE c.user_id = ?
LIMIT ? OFFSET ?;`,
  updateCartItemQuantity: `
 UPDATE cart_items ci
JOIN carts c ON ci.cart_id = c.cart_id
JOIN product_details pd ON ci.product_detail_id = pd.detail_id
JOIN products p ON pd.product_id = p.product_id
SET ci.quantity = ?
WHERE c.cart_id = ?
  AND pd.detail_id = ?
  AND c.user_id = ?;
`,
  GetTotalCart: `SELECT COALESCE(COUNT(cart_items.item_id), 0) AS total_items
    FROM users
    JOIN carts ON users.user_id = carts.user_id
    LEFT JOIN cart_items ON carts.cart_id = cart_items.cart_id
    WHERE users.user_id = ?
    GROUP BY users.user_id, carts.cart_id;`,
  // deleteCartItem: `DELETE FROM cart_items WHERE item_id = ?;`,
  deleteCartItem: 
  `DELETE FROM cart_items WHERE item_id = ?;`,
};

export default Querycart;
