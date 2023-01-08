import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/RestaurantApp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Database connected')
        }).catch((err) => {
            console.log(err)
        })

    } catch (error) {
        console.log(error);
    }
}

export default connectDB