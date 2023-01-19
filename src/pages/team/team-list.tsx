import { Card } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedList from "../../components/paginated-list/paginated-list";
import SearchField from "../../components/search-field/search-field";
import { TeamDTO } from "../../dto/team/team.dto";
import TeamService from "../../services/team/team.service";

interface UserProps {}

const TeamList: React.FC<UserProps> = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [dataTeams, setDataTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  const findAllTeams = useCallback(async () => {
    await TeamService.findAll().then((response: any) => {
      setTeams(response.data);
      setDataTeams(response.data);
    });
  }, []);

  useEffect(() => {
    findAllTeams();
  }, []);

  return (
    <div>
      <SearchField
        dataSource={dataTeams}
        fieldSearch="name"
        setDataSource={setTeams}
        setLoading={setLoading}
      />
      <Card title="Teams" loading={loading}>
        <PaginatedList
          total={teams?.length || 0}
          columns={columns}
          dataSource={teams}
          onSelectRow={(team: TeamDTO) => navigate(`${team.id}/users`)}
        />
      </Card>
    </div>
  );
};

export default TeamList;
