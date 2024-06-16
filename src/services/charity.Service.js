import { CharityDao } from "../DAO/Charity.Dao";



export class CharityService {
  constructor() {
     this.CharityDao = new CharityDao()
  }

  async create( 
    name, description, identification
) {
    try {
        const created =  await this.CharityDao.createCharity( 
            name, description, identification
        );
        return created;
    } catch (error) {
        throw error
    }
  };
  async showAll() {
    try {
        const result =  await this.CharityDao.showAllCharities()
        return result;
    } catch (error) {
        throw error;
    }
  };

  async showById(id) {
    try {
        const result =  await this.CharityDao.showCharity(id)
        return result;
    } catch (error) {
        throw error;
    }
  };
  async update(
    id, 
    name, 
    description,
     identification
    ){
    try {
        const result =  await this.CharityDao.updateCharity(
            id,
            name, 
            description,
            identification
            );
        return result;
    } catch (error) {
        throw error;
    }
  };
  async delete(id) {
    try {
        const result =  await this.CharityDao.deleteCharity(id)
        return result;
    } catch (error) {
        throw error;
    }
  };
}
