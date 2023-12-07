import connection from "../../config/Connection.js";
import QueryAddress from "../../Querydb/Addressdb.js";
import User from "../../models/User.js";
const AddressController = {
  index: async (req, res) => {
    const db = connection();
    const user_id = req.user.id;
    const user = await User.findByPk(user_id, {
      attributes: ["address"],
    });
    const userAddress = user.dataValues.address;
    db.connect();
    db.query(
      QueryAddress.getAddressbyUserId,
      [req.user.id],
      async (err, rows, fields) => {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }
        if (rows.length === 0) {
          res.status(200).send({ error: "Address not found" });
          return;
        } else {
          const data = rows.map((row) => ({
            id: row.address_id,
            recipient_name: row.recipient_name,
            street_address: row.street_address,
            city: row.city,
            state: row.state,
            postal_code: row.postal_code,
            recipient_numberphone: row.recipient_numberphone,
            default: row.address_id === userAddress ? true : false,
          }));
          res.status(200).json({ data, success: true });
        }
      }
    );
  },
  getAddressDefault: async (req, res) => {
    const db = connection();
    const user_id = req.user.id;
    const user = await User.findByPk(user_id, {
      attributes: ["address"],
    });
    const userAddress = user.dataValues.address;
    db.connect();
    db.query(
      QueryAddress.getAddressDefault,
      [user_id,userAddress],
      async (err, rows, fields) => {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }
        if (rows.length === 0) {
          res.status(200).send({status:-1, error: "Không tìm thấy địa chỉ mặc định" });
          return;
        } else {
          const data = rows.map((row) => ({
            id: row.address_id,
            recipient_name: row.recipient_name,
            street_address: row.street_address,
            city: row.city,
            state: row.state,
            postal_code: row.postal_code,
            recipient_numberphone: row.recipient_numberphone,
            default: true,
          }));
          res.status(200).json({ data, success: true });
        }
      }
    );
  },
  create: async (req, res) => {
    const {
      recipient_name,
      street_address,
      city,
      state,
      postal_code,
      default_address,
      recipient_numberphone,
    } = req.body;

    console.log(req.body);

    const user_id = req.user.id;
    const db = connection();
    db.connect();

    try {
      db.query(
        QueryAddress.createAddress,
        [
          user_id,
          recipient_name,
          street_address,
          city,
          state,
          postal_code,
          recipient_numberphone,
        ],
        async (err, rows, fields) => {
          if (err) {
            res.status(500).send({ error: err });
            return;
          }

          const newAddressId = rows.insertId;
          console.log("newAddressId", newAddressId);

          if (default_address) {
            await User.update(
              { address: newAddressId },
              { where: { user_id } }
            );
          } else {
            await User.update({ address: null }, { where: { user_id } });
          }

          res
            .status(200)
            .json({ success: true, message: "Thêm địa chỉ thành công" });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error updating user address" });
    } finally {
      db.end(); // Close the database connection
    }
  },
  update: async (req, res) => {
    const {
      address_id,
      recipient_name,
      street_address,
      city,
      state,
      postal_code,
      default_address,
      recipient_numberphone,
    } = req.body;
    console.log(req.body);

    const user_id = req.user.id;
    const db = connection();
    db.connect();

    try {
      const getAddress = () => {
        return new Promise((resolve, reject) => {
          db.query(
            QueryAddress.checkUserAddress,
            [user_id, address_id],
            (err, rows, fields) => {
              if (err) {
                reject(err);
              } else {
                resolve(rows[0].count);
              }
            }
          );
        });
      };

      const addressCount = await getAddress();

      if (addressCount === 0) {
        res.status(200).json({ success: false, message: "Address not found" });
        return;
      }

      if (default_address) {
        await User.update({ address: address_id }, { where: { user_id } });
      } else {
        await User.update({ address: null }, { where: { user_id } });
      }

      db.query(
        QueryAddress.updateAddress,
        [
          recipient_name,
          street_address,
          city,
          state,
          postal_code,
          recipient_numberphone,
          address_id,
          user_id,
        ],
        (err, rows, fields) => {
          if (err) {
            res.status(500).send({ error: err });
            return;
          }
          res.status(200).json({ success: true, message: "Address updated" });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error updating user address" });
    } finally {
      db.end(); // Close the database connection
    }
  },
  deleteAddress: async (req, res) => {
    const address_id = req.params.id;
    const user_id = req.user.id;
    const db = connection();
    db.connect();
    try {
      const getAddress = () => {
        return new Promise((resolve, reject) => {
          db.query(
            QueryAddress.checkUserAddress,
            [user_id, address_id],
            (err, rows, fields) => {
              if (err) {
                reject(err);
              } else {
                resolve(rows[0].count);
              }
            }
          );
        });
      };

      const addressCount = await getAddress();

      if (addressCount === 0) {
        res.status(200).json({ success: false, message: "Address not found" });
        return;
      }

      await User.update({ address: null }, { where: { user_id } });

      db.query(
        QueryAddress.deleteAddress,
        [address_id, user_id],
        (err, rows, fields) => {
          if (err) {
            res.status(500).send({ error: err });
            return;
          }
          res.status(200).json({ success: true, message: "Address deleted" });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error deleting user address" });
    } finally {
      db.end(); // Close the database connection
    }
  },


};
export default AddressController;
