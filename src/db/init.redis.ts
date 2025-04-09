import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379",
});
type MyRedisClientType = typeof client;

const StatusConnectionRedis = {
  CONNECTION: "connect",
  END: "end",
  RECONNECTING: "reconnecting",
  ERROR: "error",
};
const handleConnectionRedis = (initConnectRedis: MyRedisClientType) => {
  initConnectRedis.on(StatusConnectionRedis.CONNECTION, () => {
    console.log(`Connect redis - Status : connected`);
  });
  initConnectRedis.on(StatusConnectionRedis.RECONNECTING, () => {
    console.log(`Connect redis - Status : reconnecting`);
  });
  initConnectRedis.on(StatusConnectionRedis.END, () => {
    console.log(`Connect redis - Status : disconnected`);
  });
  initConnectRedis.on(StatusConnectionRedis.ERROR, (err) => {
    console.log(`Connect redis - Status : error -${err}`);
  });
};
handleConnectionRedis(client);

client.connect().catch(console.error);

export default client;
