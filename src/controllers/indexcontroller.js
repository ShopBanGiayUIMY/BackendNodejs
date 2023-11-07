const index={
    index: (req, res) => {
        res.render('Screen/index',{ title: 'Đăng nhập', layout: 'layouts/layout' });
    }
}
export default index;