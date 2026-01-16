const mongoose = require("mongoose");

const  connectDb = async () => {
  try {

    const uri = "mongodb+srv://irfanusuf33:thisispassword@cluster0.d6zzi.mongodb.net/NodeMVC?retryWrites=true&w=majority&appName=Cluster0"    // server name 

    await mongoose.connect(uri)
    
    console.log("Db Connected!")


  } catch (error) {
    console.log(`ERROR:  , ${error.message}`);
  }
};



module.exports = {connectDb}