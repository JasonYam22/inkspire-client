import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/index.services";

const genres = [
  "Traditional", "Neo-Traditional", "Japanese", "Blackwork", "Realism",
  "Watercolor", "Minimalist", "Fine Line", "Tribal", "Geometric", "Lettering", "Other",
];

function EditIdea() {
  const { ideaId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [spot, setSpot] = useState("");
  const [notes, setNotes] = useState("");
  const [artist, setArtist] = useState("");
  const [social, setSocial] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    service
      .get(`/ideas/${ideaId}`)
      .then((response) => {
        const idea = response.data;
        setTitle(idea.title);
        setGenre(idea.genre || "");
        setSpot(idea.spot || "");
        setNotes(idea.notes || "");
        setArtist(idea.artist || "");
        setSocial(idea.social || "");
        setPreview(idea.imageUrl || null);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ideaId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("spot", spot);
    formData.append("notes", notes);
    formData.append("artist", artist);
    formData.append("social", social);
    if (image) {
      formData.append("image", image);
    }

    service
      .put(`/ideas/${ideaId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate(`/ideas/${ideaId}`);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Could not update idea");
      });
  };

  const inputStyle =
    "w-full bg-white/90 border border-white/40 rounded-xl px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:bg-white focus:border-white";

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-white mb-4">Edit Idea</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-3 flex-1">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputStyle}
            />

            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className={inputStyle}
            >
              <option value="">Select genre</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Spot to get tattoo (optional)"
              value={spot}
              onChange={(e) => setSpot(e.target.value)}
              className={inputStyle}
            />

            <input
              type="text"
              placeholder="Artist (optional)"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className={inputStyle}
            />

            <input
              type="text"
              placeholder="Socials (optional)"
              value={social}
              onChange={(e) => setSocial(e.target.value)}
              className={inputStyle}
            />

            <textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={inputStyle}
              rows={3}
            />
          </div>

          <label className="flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/50 rounded-xl cursor-pointer hover:border-white hover:bg-white/10 transition-all overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <span className="text-4xl"></span>
                <span className="text-white font-semibold text-sm">
                  Click to add an image
                </span>
                <span className="text-white/60 text-xs">PNG, JPG, WEBP</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-400 mt-3">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="mt-4 w-full py-2 text-sm font-semibold rounded-xl bg-white text-zinc-900 hover:bg-zinc-200 transition-all"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditIdea;