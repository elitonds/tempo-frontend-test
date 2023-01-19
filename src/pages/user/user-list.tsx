import { useCallback, useEffect, useState } from "react";
import UserService from "../../services/user/user.service";
import { UserDTO } from "../../dto/user/user.dto";
import TeamService from "../../services/team/team.service";
import { useNavigate, useParams } from "react-router-dom";
import { TeamDetailDTO } from "../../dto/team/team-detail.dto";
import PaginatedList from "../../components/paginated-list/paginated-list";
import { Card } from "antd";
import SearchField from "../../components/search-field/search-field";

interface UserProps {}

const UserList: React.FC<UserProps> = () => {
  const { teamId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [dataTeamUsers, setDataTeamUsers] = useState([]);
  const [teamUsers, setTeamUsers] = useState([]);

  const getUsers = useCallback(async () => {
    await UserService.findAll().then((response: any) =>
      setUsers(response.data)
    );
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const getTeamDetail = useCallback(
    async (users: UserDTO[]) => {
      if (teamId) {
        const response = await TeamService.findById(teamId);
        if (response?.data) {
          const teamDetails: TeamDetailDTO = response.data;
          const usersFromTeam: any = users.filter((user) =>
            teamDetails.teamMemberIds.includes(user.id)
          );
          setTeamUsers(usersFromTeam || []);
          setDataTeamUsers(usersFromTeam);
        }
      }
    },
    [users]
  );

  useEffect(() => {
    if (users.length) {
      getTeamDetail(users);
    }
  }, [users]);

  const columns = [
    {
      title: "Name",
      dataIndex: "displayName",
      key: "id",
    },
  ];

  return (
    <div>
      <SearchField
        dataSource={dataTeamUsers}
        fieldSearch="displayName"
        setDataSource={setTeamUsers}
        setLoading={setLoading}
      />
      <Card title="Users" loading={loading}>
        <PaginatedList
          total={teamUsers?.length || 0}
          columns={columns}
          dataSource={teamUsers}
          onSelectRow={(team: UserDTO) => navigate(`/users/${team.id}`)}
        />
      </Card>
    </div>
  );
};

export default UserList;
