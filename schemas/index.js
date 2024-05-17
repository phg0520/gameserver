import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://phg0520:test1234@phg0520.rpzqk9q.mongodb.net/?retryWrites=true&w=majority&appName=phg0520",
      {
        dbName: "node_lv1", 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
  
      },
    )
    .catch((err) => console.log(err))
    .then(() => console.log("몽고디비 연결 성공"));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

export default connect;

