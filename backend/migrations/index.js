const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

require("dotenv").config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function runMigration(){
    try{
        await client.connect();
        const sql = fs.readFileSync(path.join(__dirname, "001_create_tables.sql")).toString();
        await client.query(sql);

        console.log("Migration Successful.");

    }catch(err){
        console.error("Migration failed: ", err);
    }finally{
        await client.end();
    }
}

runMigration();