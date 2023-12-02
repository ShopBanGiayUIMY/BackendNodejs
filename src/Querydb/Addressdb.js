const QueryAddress = {
  getAddressbyUserId: `
    SELECT * FROM shipping_addresses WHERE user_id =?;
    `,
  createAddress: ` INSERT INTO shipping_addresses (user_id,recipient_name,street_address,city,state,postal_code) VALUES (?,?,?,?,?,?)`,
};

export default QueryAddress;
