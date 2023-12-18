import Queryuser from "../../Querydb/Userdb.js";
import User from "../../models/User.js";
const layout = "layouts/layout";
const UserController = {
  getInfoUser: async (req, res) => {
    const user_id = req.user.id;
    console.log(user_id);
    try {
      req.getConnection((err, conn) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error connecting to database" });
        }
        conn.query(Queryuser.GetInfoUser, user_id, async (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Error logging in" });
          }
          if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
          }
          const user = result[0];
          const { password, ...info } = user; // lấy hết các trường trong user._doc trừ password
          res.status(200).json({ ...info });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error logging in" });
    }
  },
  updateInfoUser: async (req, res) => {
    const user_id = req.user.id;
    const { full_name, phone, gender, date_of_birth } = req.body;
    try {
      req.getConnection((err, conn) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error connecting to database" });
        }
        conn.query(
          Queryuser.UpdateInfoUser,
          [full_name, phone, gender, date_of_birth, user_id],
          async (err, result) => {
            if (err) {
              return res.status(500).json({ error: "Error logging in" });
            }
            if (result.length === 0) {
              return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json({ message: "Update user successfully" });
          }
        );
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error logging in" });
    }
  },
  updateVerifyToken: async (req, res) => {
    console.log(req.body)
    console.log(req.user.id)
    if (req.body.notifyToken) {
      const result = await User.update({
        notify_token: req.body.notifyToken
      }, {
        where: {
          user_id: req.user.id
        }
      })
      console.log(result)
      res.status(200).send('ok')
    } else {
      res.status(400).send({
        message: 'invalid req'
      })
    }
  }
};

export default UserController;
