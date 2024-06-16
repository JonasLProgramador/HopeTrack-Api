import { DonationDao } from "../DAO/Donation.Dao.js";


export class DonatorService {
  constructor() {
     this.DonationDao = new DonationDao();
  }

  async create( 
    amount,
    donation_date,
    payment_receipt_link,
    donator_id 
) {
    try {
        const created =  await this.DonationDao.createDonation( 
            amount,
            donation_date,
            payment_receipt_link,
            donator_id 
        );
        return created;
    } catch (error) {
        throw error
    }
  };
  async showAll() {
    try {
        const result =  await this.DonationDao.showAllDonations();
        return result;
    } catch (error) {
        throw error;
    }
  };

  async showById(id) {
    try {
        const result =  await this.DonationDao.showDonation(id)
        return result;
    } catch (error) {
        throw error;
    }
  };
  async update(
    id, 
    amount,
    donation_date,
    payment_receipt_link,
    ){
    try {
        const result =  await this.DonationDao.updateDonation(
            id,
            amount,
            donation_date,
            payment_receipt_link,
            );
        return result;
    } catch (error) {
        throw error;
    }
  };
  async delete(id) {
    try {
        const result =  await this.DonationDao.deleteDonation(id);
        return result;
    } catch (error) {
        throw error;
    }
  };
}
