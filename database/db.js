import mongoose from "mongoose";
try {
  await mongoose.connect(process.env.URI_MONGO2); //esto es una promesa por eso el await y en node no hace falta async
  console.log("DataBase connection OK!")
} catch (error) {
    console.log("Error de conexion a MongoDb", error);
}
