import { Expo } from "expo-server-sdk";
const Notification = {
  pushNotification: async (req, res) => {
    const { title, body, data } = req.body;
    console.log(title, body, data);
    const expo = new Expo();
    const messages = [];
    let pushTokens = [
      "ExponentPushToken[zjB8v7EFOAKxcSj9ATp_3g]",
      "ExponentPushToken[XrAwI2NA0RxhfQHaLPdA4S]",
      "ExponentPushToken[5HKVZABGQEgvA6V2MhRA1Y]"
    ];
    for (let pushToken of pushTokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.log(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: pushToken,
        sound: "default",
        title: title,
        body: body,
        data: { type: "ORDERSTATUS", status: "SHIPPING" },
      });
    }
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();
    let receiptIds = [];
    for (let ticket of tickets) {
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }
  },
};
export default Notification;
