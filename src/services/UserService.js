import User from '../models/User.js';
const UserService = {
    getListUser: async () => {
        try {
            const result = await User.findAll();
            return result;
        } catch (e) {
            throw e.message;
        }
    },
}
export default UserService;