import { connection } from "../data/connection.js";

export class CharityDao {
  async createCharity(name, description, identification) {
    try {
      if (!name || !description || !identification) {
        throw new Error(
          "name and description,identification are required"
        );
      }

      const [existingCharity] = await connection.query(
        "SELECT * FROM Charity WHERE identification = ?",
        [identification]
      );
      if (existingCharity.length > 0) {
        throw new Error(" Charity already exists!");
      }

      const [result] = await connection.query(
        "INSERT INTO Charity (name, description, identification) VALUES (?, ?, ? )",
        [name, description, identification]
      );
      const lastInsertId = result.insertId;
      const [created] = await connection.query(
        "SELECT * FROM Charity WHERE id = ?",
        [lastInsertId]
      );
      return created[0];
    } catch (error) {
      throw error;
    }
  }

  async showAllCharities() {
    try {
      const [result] = await connection.query("SELECT * FROM Charity");
      return result;
    } catch (error) {
      throw error;
    }
  }

  async showCharity(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }

      const [result] = await connection.query(
        "SELECT * FROM Charity WHERE id = ?",
        [id]
      );
      if (result.length < 1) {
        throw new Error("Charity not found");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateCharity(id, name, description, identification) {
    try {
      if (!id || !name || !description || !identification) {
        throw new Error(
          "ID, name and  description, identification, are required"
        );
      }

      const [existingCharity] = await connection.query(
        "SELECT * FROM Charity WHERE identification = ? AND id != ?",
        [identification, id]
      );
      if (existingCharity.length > 0) {
        throw new Error(" Charity already Exists!");
      }

      const [result] = await connection.query(
        "UPDATE Charity SET name = ?, description = ?,identification = ? WHERE id = ?",
        [name, description, identification,id]
      );
      if(result.affectedRows < 1 ){
        throw new Error("Not affective updated!,because not have changes");
      }
      const [updatedCharity] = await connection.query(
        "SELECT * FROM Charity WHERE id = ?",
        [id]
      );
      return updatedCharity[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteCharity(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }

      const [deletedCharity] = await connection.query(
        "DELETE FROM Charity WHERE id = ?",
        [id]
      );
      if (deletedCharity.affectedRows < 1) {
        throw new Error("Charity not found");
      }
      return deletedCharity[0];
    } catch (error) {
      throw error;
    }
  }
};
