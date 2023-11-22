const Queryuser = {
  registerUser: `INSERT INTO users SET ?`,
  loginUser: ` SELECT * FROM Users WHERE username = ? OR email = ?`,
  GetUserResetPassword: `SELECT * FROM users WHERE username = ? OR email = ? OR phone = ?`,
  GetEmailOrPhone: `SELECT email,phone FROM users WHERE user_id = ?`,
  GetOtp: `SELECT auth_users.auth_code, users.username FROM auth_users JOIN users ON auth_users.user_id = users.user_id WHERE auth_users.user_id = ?`,
  UpdatePassword: `UPDATE users SET password = ? WHERE user_id = ?`,
  //
  GetInfoUser: `SELECT * FROM users WHERE user_id = ?`,
};

export default Queryuser;
