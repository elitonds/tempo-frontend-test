import { TeamDTO } from "../../dto/team/team.dto";
import { api } from "../api";

const TeamService = {
  async findAll() {
    return await api.get(`teams`);
  },

  async findById(id: string){
    return await api.get(`teams/${id}`);
  },
};
export default TeamService;
