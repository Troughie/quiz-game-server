import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://nguyentienngoc7166:pAFP7NZOp2sbhISe@cluster0.iefuyum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Khởi tạo client với các tùy chọn kết nối
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export { client };
