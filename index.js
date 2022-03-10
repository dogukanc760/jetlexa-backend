const express = require("express");
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');  
const swaggerUI = require('swagger-ui-express');  
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");



//swagger
//Swagger Configuration  
const swaggerOptions = {  
  swaggerDefinition: {  
      info: {  
          title:'Jetlexa User API',  
          version:'1.0.0'  
      }  
  },  
  apis:['./routes/user.routes.js'],  
}  
const swaggerDocs = swaggerJSDoc(swaggerOptions);  
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs)); 


//add routes
const userRoute = require("./routes/user.routes");


//app allow
dotenv.config();
app.use(cors());
app.use(express.json());
app.options("*", cors());


//logger middleware
const myLogger = function (req, res, next) {
  console.log("A request has come request is:");
  console.log(req.body);
  next()
}


//Use middleware
app.use(myLogger);


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection successfully"))
  .catch((err) => {
    console.log(err);
  });

//api endpoints
app.use("/api/user", userRoute);


//get images
app.use("/images", express.static(path.join(__dirname, "routes/images")));




app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Api is working! Say hello" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server running at " + process.env.PORT);
});
