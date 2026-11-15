import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import Loading from "../../components/Loading";
import service from "../../services/index.services";
import { updateArtistBio } from "../../services/user.services";
import { useAuth } from "../../context/auth.context";
import type { User } from "../../types";

function Profile() {
  const { loggedUserId } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [isSavingBio, setIsSavingBio] = useState(false);
  const [bioMessage, setBioMessage] = useState("");

  useEffect(() => {
    service
      .get<User>("/users/user")
      .then((response) => {
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setBio(response.data.artistBio || "");
        setBioMessage("");
      })
      .catch(() => setLoadError(true));
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
    const image = e.target.files?.[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    service
      .post("/users/upload", formData)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  // Save the bio through the route that checks the artist role.
  const handleSaveBio = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingBio(true);
    setBioMessage("");

    try {
      const { artistBio } = await updateArtistBio(bio);
      setBio(artistBio || "");
      setBioMessage("Bio saved.");
    } catch {
      setBioMessage("Couldn’t save your bio. Please try again.");
    }

    setIsSavingBio(false);
  };

  if (!user) {
    return (
      <main className="page">
        {loadError ? (
          <p role="alert" className="text-red-300">
            Couldn’t load your profile. Refresh to try again.
          </p>
        ) : (
          <Loading label="Loading your profile…" />
        )}
      </main>
    );
  }

  return (
    <main className="page">
      <h1 className="page-title mb-6">Your profile</h1>

      <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)]">
        <section className="panel w-full max-w-sm md:max-w-none">
          <div className="idea-image relative grid aspect-square place-items-center">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.username}
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <span
                className="text-7xl font-bold text-violet-300"
                aria-hidden="true"
              >
                {user.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <label className="button-secondary mt-3 w-full cursor-pointer has-focus-visible:outline-2 has-focus-visible:outline-violet-300">
            <Camera aria-hidden="true" className="size-4" />
            {user.imageUrl ? "Change photo" : "Add a photo"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </label>
        </section>

        <div className="space-y-5">
          <section className="panel">
            <div className="space-y-5 p-2 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">Account details</h2>
                <span className="text-sm font-medium text-violet-300">
                  {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
                </span>
              </div>

              {isEditing ? (
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSave();
                  }}
                >
                  <label className="block space-y-2 text-sm">
                    <span>Username</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      className="field w-full"
                      required
                    />
                  </label>
                  <label className="block space-y-2 text-sm">
                    <span>Email</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="field w-full"
                      required
                    />
                  </label>
                  <button type="submit" className="button-primary">
                    Save changes
                  </button>
                </form>
              ) : (
                <>
                  <div>
                    <p className="break-words text-2xl font-bold">
                      {user.username}
                    </p>
                    <p className="muted mt-1 break-words text-sm">
                      {user.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="button-secondary"
                  >
                    Edit profile
                  </button>
                </>
              )}
            </div>
          </section>

          {user.role === "ARTIST" && (
            <form onSubmit={handleSaveBio} className="panel">
              <div className="space-y-3 p-2 sm:p-4">
                <label
                  htmlFor="artist-bio"
                  className="block text-xl font-semibold"
                >
                  Artist bio
                </label>
                <textarea
                  id="artist-bio"
                  value={bio}
                  onChange={(event) => {
                    setBio(event.target.value);
                    setBioMessage("");
                  }}
                  maxLength={500}
                  rows={4}
                  disabled={isSavingBio}
                  className="field w-full"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSavingBio}
                    className="button-primary"
                  >
                    {isSavingBio ? "Saving…" : "Save bio"}
                  </button>
                  <p className="muted text-sm tabular-nums">{bio.length}/500</p>
                </div>
                {bioMessage && (
                  <p role="status" className="muted text-sm">
                    {bioMessage}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;
