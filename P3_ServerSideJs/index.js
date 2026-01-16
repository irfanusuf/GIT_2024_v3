const express = require("express"); // express library ko import kero node module se
const path = require("path"); // import from node modules
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const xhbs = require("express-handlebars");

const {
  registerController,
  loginController,
} = require("./controllers/userController"); // import function from userController

const { connectDb } = require("./config/connectDb");
const getUser = require("./controllers/getUserControllers");

const {
  createBlog,
  getallBlogs,
  getBlogById,
  listBlogs,
  getEditBlog,
  editBlog,
} = require("./controllers/blogController");

const { isAuthenticated } = require("./middlewares/isAuthenticated");

// node module standard libarary hai node js ki     // 3rd party libarary

const app = express(); // new instance of express intailized
const Port = 4004;

connectDb(); // connecting mongo db

// graphics engine
// app.set("view engine" , "html")      // default configuration for express

app.set("view engine", "hbs"); // chnaging render engine to hbs
app.set("views", path.join(__dirname, "views", "pages")); // web pages are inside the pages folder
// app.set("partial", path.join(__dirname, "views", "partials"));   // web pages are inside the pages folder

app.engine(
  "hbs",
  xhbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);

//middle ware // helping functions which parses incoming data in json  and destructures it for controller
app.use(bodyParser.urlencoded({ extended: true })); // relevant for post methods
// app.use(express.json()); //parsing  json data
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serving statics files  tfrom the server which are in public folder  // css // js // assets
app.use(cookieParser()); // now can get and accept  cookies from  browser
// client tries to get a page and server sends page in response



app.get("/", getallBlogs );
app.get("/register", (req, res) => { res.render("register", { title: "Techytechs | Register" });}); // done
app.get("/login", (req, res) => { res.render("login", { title: "Techytechs | Login" });}); // done
app.get("/about", (req, res) => {res.render("about", { title: "Techytechs | About" });});
app.get("/contact", (req, res) => {res.render("contact", { title: "Techytechs | Contact" });});



// user routes
app.post("/register", registerController); // done
app.post("/login", loginController); // done
app.get("/user/profile", isAuthenticated, getUser);


//blog Routes 

app.get("/blog/create", isAuthenticated, (req, res) => {res.render("createBlog");});


app.post("/blog/create", isAuthenticated, createBlog);


app.get("/blog/edit/:blogId", isAuthenticated, getEditBlog);
app.put("/blog/edit/:blogId", isAuthenticated, editBlog);





app.get("/blogs/list" ,isAuthenticated , listBlogs)



app.get("/blogs", getallBlogs);
app.get("/blog/:blogId", getBlogById);



app.listen(Port, () => {
  console.log(`Server started listening on Port ${Port}`);
});
