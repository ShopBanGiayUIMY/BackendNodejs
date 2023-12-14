import { OrderService } from "../../services/OrderService.js";

const layout = "layouts/layout";

const AnalyticController = {
  index: async (req, res) => {
    try {
      if (!(req.query.startDate || req.query.endDate)) {
        console.log('have not body')
      }
      console.log(req.query?.startDate, req.query?.endDate)
      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
        0,
        0,
        0
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      console.log(
        "current day of the month:",
        currentDate.toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
      );
      console.log(
        "First day of the month:",
        firstDayOfMonth.toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
      );
      console.log(
        "Last day of the month:",
        lastDayOfMonth.toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
      );
      console.log(currentDate);
      console.log(firstDayOfMonth);
      console.log(lastDayOfMonth);
      const orders = await OrderService.analysicOrderInRangeOfDate({
        startDate: firstDayOfMonth,
        endDate: lastDayOfMonth,
      });
      // console.log(JSON.stringify(orders));
      const firstDate = firstDayOfMonth.toUTCString()
      const lastDate = lastDayOfMonth.toUTCString();
      const serverUrl = process.env.HOST_NAME;
      res.render("analytic/analytic", {
        title: "Quản lý doanh thu",
        layout: layout,
        data: {
          orders,
          timestamp: {
            firstDate: firstDate,
            endDate: lastDate,
          },
          serverUrl: serverUrl
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
export default AnalyticController;
