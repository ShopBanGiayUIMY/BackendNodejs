const layout = "layouts/layout";

const AnalyticController = {
  index: async(req, res) => {
    try {
  
    res.render("analytic/analytic", {
        title: "Quản lý doanh thu",
        layout: layout,
      });
    } catch (error) {
      console.log(error);
    }
  },

};
export default AnalyticController;
