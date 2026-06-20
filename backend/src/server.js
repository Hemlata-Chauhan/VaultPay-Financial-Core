require("dotenv").config();

const app =
    require("./app");

const connectDB =
    require("./config/db");

connectDB();

const PORT =
    process.env.PORT || 5000;
    
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "VaultPay API Running Successfully"
    });
});

app.listen(PORT, () => {
    console.log(
        `Server Running On Port ${PORT}`
    );
});
