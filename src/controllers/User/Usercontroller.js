import Queryuser from '../../Querydb/Userdb.js';
const UserController = {
    getInfoUser:async (req, res) => {
        const user_id = req.params.id
        try {
            req.getConnection((err, conn) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "Error connecting to database" });
              }
              conn.query(
                Queryuser.GetInfoUser,
                user_id,
                async (err, result) => {
                  if (err) {
                    return res.status(500).json({ error: "Error logging in" });
                  }
                  if (result.length === 0) {
                    return res.status(404).json({ error: "User not found" });
                  }
                    const user = result[0];
                    const { password, ...info } = user; // lấy hết các trường trong user._doc trừ password
                    res.status(200).json({ users:{...info}});
                }
              );
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error logging in" });
          }
    }

}

export default UserController;

