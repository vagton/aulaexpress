module.exports = {
    HOST: "localhost",
    PORT: "1434",
    //PORT: "3306",
    USER: "sa1",
    //USER: "root",
    PASSWORD: "Senha@123",
    //PASSWORD: "",
    DB: "users_db",
    //DB: "explicadores-db",
    dialect: "mssql",
    //dialect: "mariadb",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, //espera
        idle: 10000
    }
}