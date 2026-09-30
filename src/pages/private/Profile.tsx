import { useState, useEffect, useContext } from "react";
import service from "../../services/index.services";
import { AuthContext } from "../../context/auth.context";
import type { User } from "../../types"

function Profile() {
  const { loggedUserId } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    service
      .get("/users/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loggedUserId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      {user.imageUrl && <img src={user.imageUrl} alt={user.username} />}
  <h1 className="text-amber-50">Username: {user.username}</h1>
<p className="text-amber-50">Email: {user.email}</p>
<p className="text-amber-50">Role: {user.role}</p>
    </div>
  );
}

export default Profile;