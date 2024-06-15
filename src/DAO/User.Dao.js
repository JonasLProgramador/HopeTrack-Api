import { connection } from "../data/connection";


export class UserDao{
    
    async createUser(...data){
        try {
          const [users,fields] = await connection.query(
            "INSERT INTO  Users (name,email) VALUES (?,?); SELECT LAST_INSERT_ID();", [...data]
          );
          return users
        } catch (error) {
          console.error(error);
        }
      }
      
}
  