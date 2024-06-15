export class UserService {
  constructor(UserDao) {
    this.UserDao = new UserDao();
  }

  async create(...data) {
    try {
        const created =  await this.UserDao.createUser(...data)
        return created
    } catch (error) {
        throw error
    }
  }
}
