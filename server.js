require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./passport.js");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();
const authRoute = require("./routes/auth");
const userRoutes = require("./routes/users");
const courseRoutes=require('./routes/course.js');
const db = require('./db/conn')
const emailRoutes = require("./routes/email");
const port = process.env.PORT || 4000;
const BASE_URL = process.env.BASE_URL

app.use(
    cors({
        origin: BASE_URL,
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
        headers: "Content-Type,X-Auth-Token,Origin,Authorization,X-Requested-With,Access-Control-Allow-Headers,access-control-allow-credentials",
    })
);

app.use(
    cookieSession({
        name:"session",
        keys:["etmeyers"],
        maxAge: 864 * 100 * 100,
    })
);
// app.get('/about',(req,res)=>{
//   res.send('<p>Check</p>');
// });

app.use(userRoutes);
app.use(emailRoutes);
app.use("/auth", authRoute);
app.use(courseRoutes)
app.use(passport.initialize());
app.use(passport.session());
db.run()
app.listen(port, () => console.log(`Listening on port ${port}...`));

