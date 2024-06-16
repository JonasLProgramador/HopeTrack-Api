import { DonatorDao } from "../DAO/Donator.Dao.js";

export class DonatorService {
  constructor() {
     this.DonatorDao = new DonatorDao();
  }

  async create(name,email) {
    try {
        const created =  await this.DonatorDao.createDonator(name,email);
        return created;
    } catch (error) {
        throw error
    }
  };
  async showAll() {
    try {
        const result =  await this.DonatorDao.showAllDonators();
        return result;
    } catch (error) {
        throw error;
    }
  };

  async showById(id) {
    try {
        const result =  await this.DonatorDao.showDonator(id);
        return result;
    } catch (error) {
        throw error;
    }
  };
  async update(id,name,email) {
    try {
        const result =  await this.DonatorDao.updateDonator(id,name,email);
        return result;
    } catch (error) {
        throw error;
    }
  };
  async delete(id) {
    try {
        const result =  await this.DonatorDao.deleteDonator(id);
        return result;
    } catch (error) {
        throw error;
    }
  };
}
