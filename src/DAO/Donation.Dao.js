import { connection } from "../data/connection.js";

export class DonationDao {
  async createDonation(
    amount,
    donation_date,
    payment_receipt_link,
    donator_id
  ) {
    try {
      if (!amount || !donation_date || !payment_receipt_link || !donator_id) {
        throw new Error(
          "amount and donation date and payment_receipt_Link and donator_id  are required"
        );
      }

      const [existingDonation] = await connection.query(
        "SELECT * FROM Donator WHERE payment_receipt_link = ?",
        [payment_receipt_link]
      );
      if (existingDonation.length > 0) {
        throw new Error(" already donated!,repeated donation");
      }

      const [result] = await connection.query(
        "INSERT INTO Donation (amount, donation_date,payment_receipt_link,donator_id) VALUES (?, ?, ? ,?)",
        [amount, donation_date, payment_receipt_link, donator_id]
      );
      const lastInsertId = result.insertId;
      const [created] = await connection.query(
        "SELECT * FROM Donation WHERE id = ?",
        [lastInsertId]
      );
      return created[0];
    } catch (error) {
      throw error;
    }
  }

  async showAllDonations() {
    try {
      const [result] = await connection.query("SELECT * FROM Donation");
      return result;
    } catch (error) {
      throw error;
    }
  }

  async showDonation(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }

      const [result] = await connection.query(
        "SELECT * FROM Donation WHERE id = ?",
        [id]
      );
      if (result.length < 1) {
        throw new Error("Donation not found");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateDonator(
    id,
    amount,
    donation_date,
    payment_receipt_link,
  ) {
    try {
      if (
        !id | !amount ||
        !donation_date ||
        !payment_receipt_link 
      ) {
        throw new Error(
          "ID, amount and  donation date, payment receipt link, donator id  are required"
        );
      }

      const [existinDonation] = await connection.query(
        "SELECT * FROM Donation WHERE payment_receipt_link = ? AND id != ?",
        [payment_receipt_link, id]
      );
      if (existinDonation.length > 0) {
        throw new Error(" already donated!,donated repeated");
      }

      const [result] = await connection.query(
        "UPDATE Donator SET amount = ?, donation_date = ?,payment_receipt_link = ? WHERE id = ?",
        [
            amount,
            donation_date,
            payment_receipt_link,
            id
        ]
      );
      const [updatedDonator] = await connection.query(
        "SELECT * FROM Donation WHERE id = ?",
        [id]
      );
      return updatedDonator[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteDonation(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }

      const [deletedDonation] = await connection.query(
        "DELETE FROM Donation WHERE id = ?",
        [id]
      );
      if (deletedDonation.affectedRows < 1) {
        throw new Error("Donation not found");
      }
      return deletedDonation[0];
    } catch (error) {
      throw error;
    }
  }
}
