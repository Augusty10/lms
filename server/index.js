import expresss from 'express'
import morgan from 'morgan';
import  dotennv from "dotenv";
import rateLimit  from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize  from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser  from 'cookie-parser';
import cors from "cors" ;
import { checkHealth } from './controllers/health.controller';
import healthRoute from './routes/health.routes';
import userRoute from "./routes/user.route.js";



dotennv.config();
console.log(process.env.PORT);



// Global Rate Limiting 
const Limiter = rateLimit(
{
    windowMs: 15*60*1000,  // 15 minutes 
    limit: 100, // limit each IP to 100 requests per windowMs
    Message: "Too many requests from this  IP, plese try again "
    }
)



// Security midddleware 
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use('/api', Limiter);




// logging middleware 
if(process.env.NODE_ENV === 'devlopment'){
    app.use(morgan('dev'));
}


const app = expresss();
const PORT = process.env.PORT 


// Body parser middleware 
app.use(expresss.json({limit: "10kb"}))
app.use(expresss.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());





// Global Errror Handler 
app.use((err, req, res, next )=> {
    console.error(err.stack)
    res.status(err.stack || 500).json({
        status: "error",
        Message: err.Message || " INternal Server Error",
        ...(process.env.NODE_ENV === 'development' && {stack: err.stack})
    })
})

// CORS Confiiguration
app.use(cors({
    origin: process.env.CLIENT_URL|| "http://Localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH", "HEAD", "OPTIONS"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "X-Requested-with",
        "Accept",
        "Origin",
        "Accept"
    ],
}));


// API Routes  localhost : 4000/api/vi/user

app.use("/api/v1/healthcheck", healthRoute);
app.use("/api/v1/user", userRoute);

// it should be always  at bottom 
// 404 handler 


app.use((req, res )=> {
  res.status(404).json({
    status: "fail",
    Message: " Route not found",
  })

})


app.listen(PORT,()=> {
    console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV} MODE` );
    
})
