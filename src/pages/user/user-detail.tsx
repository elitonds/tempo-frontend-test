import { Card } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserDetailDTO } from "../../dto/user/user-detail.dto";
import UserService from "../../services/user/user.service";

interface UserDetailProps {}

const UserDetail: React.FC<UserDetailProps> = () => {
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

  const lineInfo = (value: string, id: string) => {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          height: "30px",
        }}
        id={id}
      >
        <span>{value}</span>
      </div>
    );
  };

  return (
    <Card style={{ width: 300, marginTop: 16 }} title="User Details">
      {user && (
        <div style={{ display: "block" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              height: "80px",
            }}
          >
            <img src={user.avatarUrl} />
          </div>
          {lineInfo(`${user.firstName} ${user.lastName}`, "full-name")}
          {lineInfo(user.displayName, "user-name")}
        </div>
      )}
    </Card>
  );
};

export default UserDetail;
