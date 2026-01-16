const mongoose = require("mongoose")



const connectDb = async () => {

    try {
        const connectionString = process.env.MONGO_URI
        // these process are happening on workers threads lefting the main thread vacant and not blocking i/o
        await mongoose.connect(connectionString)   // libuv will transefer this task to microtask quene
        console.log("Db Connected ")  // this process was waiting for above await  
    } catch (error) {
        console.log(error)
    }
}



module.exports = connectDb
