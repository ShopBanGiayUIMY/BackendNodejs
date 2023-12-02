import connection from "../../config/Connection.js";
import QueryAddress from "../../Querydb/Addressdb.js";
const AddressController = {
  index: async (req, res) => {
    const db = connection();
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
          const data = rows.map((row) => {
            return {
              id: row.address_id,
              recipient_name: row.recipient_name,
              street_address: row.street_address,
              city: row.city,
              state: row.state,
              postal_code: row.postal_code,
            };
          });
          res.status(200).json({ data, success: true });
        }
      }
    );
  },
  create: async (req, res) => {
    const {recipient_name,street_address,city,state,postal_code} = req.body;
    const user_id = req.user.id;
    const db = connection();
    db.connect();
    db.query(
      QueryAddress.createAddress,
      [
        user_id,
        recipient_name,
        street_address,
        city,
        state,
        postal_code
      ],
      async (err, rows, fields) => {
        if (err) {
          res.status(500).send({ error: err });
          return;
        }
        res.status(200).json({ success: true });
      }
    );
  },
};
export default AddressController;
