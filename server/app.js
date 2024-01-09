import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./router/router.js";
import ENV from './router/config.js'

const app = express();

/**Middlewares */

app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(morgan("tiny"))
app.disable('x-powered-by')

/**Port */
const port = 5000;

/**api  routes */
app.use('/api',router)

/**HTTP GET request */
app.get('/',(req,res)=>{
     res.status(201).json('Home GET request')
})

/**Mongodb connection */
mongoose.connect(ENV.MONGODB_ATLAS,{ 
    // useNewUrlParser:true, 
    // useUnifiedTopology:true,   
}).then(()=>{
    console.log('DB Connection successfull')
}).catch((err)=>{
    console.log(err.message) 
})

/**start server */
app.listen(port,()=>{
    console.log(`server comected to http://localhost:${port}`)
})