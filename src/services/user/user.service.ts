import { UserDTO } from "../../dto/user/user.dto";
import { api } from "../api";

const UserService = {
  async findAll() {
    return api.get(`users`);
  },

  async findById(id: string): Promise<UserDTO> {
    return await api.get(`users/${id}`);
  },
};

export default UserService;
