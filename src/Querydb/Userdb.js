const Queryuser = {
    registerUser:`INSERT INTO Users SET ?`,
    loginUser:`SELECT * FROM Users WHERE username = ?`,
    GetUserResetPassword:`SELECT * FROM users WHERE username = ? OR email = ? OR phone = ?`,
    GetEmailOrPhone:`SELECT email,phone FROM users WHERE user_id = ?`,
    GetOtp:`SELECT auth_user.auth_code, users.username FROM auth_user JOIN users ON auth_user.user_id = users.user_id WHERE auth_user.user_id = ?`,
    UpdatePassword:`UPDATE users SET password = ? WHERE user_id = ?`,
    //
    GetInfoUser:`SELECT * FROM users WHERE user_id = ?`,
}

export default Queryuser;