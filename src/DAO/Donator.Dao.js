import { connection } from "../data/connection.js";

export class DonatorDao {

  async createDonator(name, email) {
    try {
      if (!name || !email) {
        throw new Error("Name and email are required");
      }

      
      const [existingEmail] = await connection.query(
        "SELECT * FROM Donator WHERE email = ?", [email]
      );
      if (existingEmail.length > 0) {
        throw new Error("Email already in use");
      }

      const [result] = await connection.query(
        "INSERT INTO Donator (name, email) VALUES (?, ?)", [name, email]
      );
      const lastInsertId = result.insertId;
      const [created] = await connection.query(
        "SELECT * FROM Donator WHERE id = ?", [lastInsertId]
      );
      return created[0];
    } catch (error) {
      throw error;
    }
  }

  async showAllDonators() {
    try {
      const [result] = await connection.query(
        "SELECT * FROM Donator"
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async showDonator(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }

      const [result] = await connection.query(
        "SELECT * FROM Donator WHERE id = ?", [id]
      );
      if(result.length < 1){
        throw new Error("Donator not found");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateDonator(id, name, email) {
    try {
      if (!id || !name || !email) {
        throw new Error("ID, name and email are required");
      }


      const [existingEmail] = await connection.query(
        "SELECT * FROM Donator WHERE email = ? AND id != ?", [email, id]
      );
      if (existingEmail.length > 0) {
        throw new Error("Email already in use by another donator");
      }

      const [result] = await connection.query(
        "UPDATE Donator SET name = ?, email = ? WHERE id = ?", [name, email, id]
      );
      const [updatedDonator] = await connection.query(
        "SELECT * FROM Donator WHERE id = ?", [id]
      );
      return updatedDonator[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteDonator(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }

      const [deletedDonator] = await connection.query(
        "DELETE FROM Donator WHERE id = ?", [id]
      );
      if(deletedDonator.affectedRows < 1){
        throw new Error("Donator not found");
      }
      return deletedDonator[0];
    } catch (error) {
      throw error;
    }
  }
}
