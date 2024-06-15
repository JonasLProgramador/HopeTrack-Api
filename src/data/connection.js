import mysql from 'mysql2/promise'
import 'dotenv/config'


export const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
})

export const testConnection = async () => {
    try {
      await connection.ping();
      console.log('Connection establish successful to database')
    } catch (error) {
      throw new Error('Not possible establish conection with database because'),error 
    }
  };