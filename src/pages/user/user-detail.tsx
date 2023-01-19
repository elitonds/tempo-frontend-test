import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserDetailDTO } from "../../dto/user/user-detail.dto";
import UserService from "../../services/user/user.service";

const UserDetail: React.FC<{}> = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({} as UserDetailDTO);

  const getUser = useCallback(async () => {
    if (userId) {
      const response: any = await UserService.findById(userId);
      if (response.data) setUser(response.data);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <Card style={{ width: 300, marginTop: 16 }}>
      {user && (
        <Meta
          avatar={<Avatar src={user.avatarUrl} />}
          title={user.displayName}
          description={`${user.firstName} ${user.lastName}`}
        />
      )}
    </Card>
  );
};

export default UserDetail;
