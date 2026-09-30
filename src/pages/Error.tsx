import { useNavigate } from "react-router-dom"

function Error() {

  const navigate = useNavigate()

  return (
     
      <div>
        
     {/* Error */}
        <p>
          Something went wrong
        </p>

        <h1>
          404
        </h1>

        <p>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}>
          Back to home
        </button>
        </div >
  );
}

export default Error
