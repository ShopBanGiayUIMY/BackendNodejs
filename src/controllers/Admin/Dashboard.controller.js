const layout = 'layouts/layout';
const DashboardController = {
    index: (req, res) => {
        res.render('Screen/dashboard', { title: 'Dashboard', layout: layout });
    },
    alert: (req, res) => {
        res.render('Screen/alert', { title: 'Alert', layout: layout });
    },
}
export default DashboardController;