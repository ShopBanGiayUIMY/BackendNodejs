const layout = "layouts/layout";

const OrderController = {
  index: async(req, res) => {
    try {
    //   const result = await OrderService.getListOrderAdmin();
    //   const data = result.map((row) => {
    //     return {
    //       id: row.order_id,
    //       user_id: row.user_id,
    //       user_name: row.user_name,
    //       user_phone: row.user_phone,
    //       user_address: row.user_address,
    //       total_price: row.total_price,
    //       status: formatStatus(row.status),
    //       created_at: formatDate(row.created_at),
    //       updated_at: formatDate(row.updated_at),
    //     };
    //   });
    //   function formatDate(timestamp) {
    //     const date = new Date(timestamp * 1000);
    //     const day = date.getDate().toString().padStart(2, "0");
    //     const month = (date.getMonth() + 1).toString().padStart(2, "0");
    //     const year = date.getFullYear();
    //     return `${day}/${month}/${year}`;
    //   }
    //   function formatStatus(status) {
    //     switch (status) {
    //       case 1:
    //         return "Đang chờ xử lý";
    //       case 2:
    //         return "Đang giao hàng";
    //       case 3:
    //         return "Đã giao hàng";
    //       case 4:
    //         return "Đã hủy";
    //       default:
    //         return "Không xác định";
    //     }
    //   }
    //   res.render("order/order", {
    //     data,
    //     layout: layout,
    //     title: "Quản lý đơn hàng",
    //   });
    res.render("order/order", {
        title: "Quản lý đơn hàng",
        layout: layout,
      });
    } catch (error) {
      console.log(error);
    }
  },

};
export default OrderController;
