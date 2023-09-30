const Queryuser = {
    registerUser:`INSERT INTO Users SET ?`,
    loginUser:`SELECT * FROM Users WHERE username = ?`,
}

// module.exports = Queryuser;
export default Queryuser;