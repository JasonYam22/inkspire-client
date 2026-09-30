import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/index.services";

const genres = [
  "Traditional", "Neo-Traditional", "Japanese", "Blackwork", "Realism",
  "Watercolor", "Minimalist", "Fine Line", "Tribal", "Geometric", "Lettering", "Other",
];

function NewIdea() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [spot, setSpot] = useState("");
  const [notes, setNotes] = useState("");
  const [artist, setArtist] = useState("");
  const [social, setSocial] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //grabs single file because of [1], though its a list
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // creates an empty container jsut for sending files
    const formData = new FormData();
    //adds one field at a tim
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("spot", spot);
    formData.append("notes", notes);
    formData.append("artist", artist);
    formData.append("social", social);
    //avoids sending empty file
    if (image) {
      formData.append("image", image);
    }

    // formData is the body
    try {
      await service.post("/ideas", formData, {
        // this header is a config object which tells the server that it contains a file
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/ideas");
    } catch (error: any) {
      console.log(error);
      setErrorMessage("Could not create idea");
    }
  };

return (
  <div className="flex flex-col gap-4 p-4">
    <h1>Add New Idea</h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
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
      />

      <input
        type="text"
        placeholder="Artist (optional)"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <input
        type="text"
        placeholder="Socials (optional)"
        value={social}
        onChange={(e) => setSocial(e.target.value)}
      />

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit">Save Idea</button>
    </form>
  </div>
);
}

export default NewIdea;