import { useState, useEffect } from "react";
import service from "../../services/index.services";
import { useAuth } from "../../context/auth.context";
import type { User } from "../../types";

function Profile() {
  const { loggedUserId } = useAuth();
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
    <div className="min-h-[85vh] w-full flex items-center justify-center p-4">
      {/* Main Profile Card Container */}
      <div className="relative w-full max-w-md bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-zinc-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-zinc-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Your Profile
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your identity and account preferences
          </p>
        </div>

        {/* Avatar Upload Area */}
        <div className="flex flex-col items-center mb-6">
          <label className="relative group cursor-pointer w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-xl transition-all duration-300 hover:border-white/50 hover:scale-105">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex flex-col items-center justify-center text-zinc-400 p-2 text-center">
                <svg
                  className="w-8 h-8 mb-1 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <circle cx="12" cy="13" r="3" strokeWidth="1.5" />
                </svg>
                <span className="text-xs font-medium">Upload photo</span>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-medium transition-opacity duration-200 backdrop-blur-[2px]">
              <svg
                className="w-5 h-5 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Change photo
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <span className="text-[11px] text-zinc-500 mt-2">
            Click image to update avatar
          </span>
        </div>

        {/* User Info & Edit Form */}
        <div className="space-y-4 text-center">
          {isEditing ? (
            <div className="flex flex-col gap-3 text-left">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full bg-zinc-800/80 border border-white/10 focus:border-white/40 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-zinc-800/80 border border-white/10 focus:border-white/40 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none transition"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {user.username}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {user.email || "No email provided"}
              </p>
            </div>
          )}

          {/* Role Badge */}
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Role: {user.role}
            </span>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="w-full bg-white text-zinc-950 hover:bg-zinc-200 active:scale-[0.98] text-sm font-semibold py-2.5 px-5 rounded-xl transition duration-200 shadow-lg shadow-white/5"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
