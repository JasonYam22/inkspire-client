import { useState, useEffect, useContext } from "react";
import service from "../../services/index.services";
import { AuthContext } from "../../context/auth.context";
import type { User } from "../../types";

function Profile() {
  const { loggedUserId } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    service
      .get("/users/user")
      .then((response) => {
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loggedUserId]);

  const handleSave = () => {
    service
      .put("/users/user", { username, email })
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
      })
      .catch((error) => console.log(error));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    service
      .post("/users/upload", formData)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen  p-6 flex items-center justify-center text-center flex-col">
      <h1 className="text-3xl font-bold text-zinc-900 mt-4 mb-1">
        Your Profile
      </h1>
      <p className="text-zinc-500 mb-6">
        Your account details and settings.
      </p>

      <div className="bg-white rounded-2xl overflow-hidden shadow-md w-80">
<label className="relative cursor-pointer group h-56 bg-zinc-100 flex items-center justify-center text-center">  {user.imageUrl ? (
    <img
      src={user.imageUrl}
      alt={user.username}
      className="w-full h-56 object-cover"
    />
  ) : (
    <span className="text-zinc-400 text-sm">Click to upload photo</span>
  )}
  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition">
    Change photo
  </span>
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
  />
</label>
        <div className="p-4 flex flex-col gap-2">
          {isEditing ? (
            <>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-zinc-300 rounded px-2 py-1 text-sm"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-zinc-300 rounded px-2 py-1 text-sm"
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-zinc-900">
                {user.username}
              </h2>
              <p className="text-zinc-600 text-sm">Email: {user.email}</p>
            </>
          )}

          <span className="inline-block w-fit text-xs font-semibold uppercase tracking-wide bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
            {user.role}
          </span>

          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="mt-2 bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-zinc-700"
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;