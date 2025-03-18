// //---------------------------
// // IMPORTS
// //---------------------------
// const express      = require('express');
// const mongoose     = require('mongoose');
// const dotenv       = require('dotenv');
// const cors         = require('cors');
// const morgan       = require('morgan');
// const cookieParser = require("cookie-parser");

// const userRoutes = require("./Routes/userRoute");
// //---------------------------
// // Middleware
// //---------------------------
// dotenv.config();
// const app = express();
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(cookieParser());
// const corsOptions = {
//   origin: "http://localhost:5173", // السماح فقط بالطلبات من هذه الواجهة الأمامية
//   credentials: true, // السماح بإرسال الكوكيز مع الطلبات
// };

// app.use(cors(corsOptions)); 



// //---------------------------
// // Connect DB
// //---------------------------
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });


// //---------------------------
// // ROUTES
// //---------------------------
// app.get('/', (req, res) => {
//     res.send('Server is running....');
// });


// //---------------------------
// // ERROR HANDLERS
// //---------------------------
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });
// // إعداد المسارات
// app.use("/api/users", userRoutes);
// //---------------------------
// // Connect SERVER
// //---------------------------
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
//---------------------------
// IMPORTS
//---------------------------
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser');

// const userRoutes = require('./Routes/userRoute');

// //---------------------------
// // Middleware
// //---------------------------
// dotenv.config();
// const app = express();
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(cookieParser());

// const corsOptions = {
//   origin: 'http://localhost:5174', // السماح فقط بالطلبات من هذه الواجهة الأمامية
//   credentials: true, // السماح بإرسال الكوكيز مع الطلبات
// };

// app.use(cors(corsOptions));

// //---------------------------
// // Connect DB
// //---------------------------
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// //---------------------------
// // ROUTES
// //---------------------------
// app.get("/api/users", (req, res) => {
//   res.send("Server is running....");
// });

// // إعداد المسارات
// app.use("/api/users", userRoutes);

// //---------------------------
// // ERROR HANDLERS
// //---------------------------
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   // res.status(500).json({ message: 'Something went wrong!', error: err.message });
// // });

// //---------------------------
// // Connect SERVER
// //---------------------------
// app.get("/",(req,res)=>{
// res.send("ahmad")
// })
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port http://localhost:${PORT}`);
// });



//---------------------------
// IMPORTS
//---------------------------
const express      = require('express');
const mongoose     = require('mongoose');
const dotenv       = require('dotenv');
const cors         = require('cors');
const morgan       = require('morgan');
const cookieParser = require("cookie-parser");
const articleRoutes = require('./Routes/articleRoute');
const upcomingGameRoute = require("./Routes/upcomingGameRoute");  // Import the new routes
const userRoute = require("./Routes/userRoute");

//---------------------------
// Middleware
//---------------------------
dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
const corsOptions = { origin: 'http://localhost:5173', credentials: true, };
app.use(cors(corsOptions));


//---------------------------
// Connect DB
//---------------------------
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });


//---------------------------
// ROUTES
//---------------------------


app.use("/api/articles", articleRoutes);
app.use("/api/upcoming-releases", upcomingGameRoute);
app.use("/api/contact",require("./Routes/contactRoute"));
app.use("/api/users", userRoute);
//---------------------------
// ERROR HANDLERS
//---------------------------
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//---------------------------
// Connect SERVER
//---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});