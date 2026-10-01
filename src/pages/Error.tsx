import { useNavigate } from "react-router-dom"

function Error() {

  const navigate = useNavigate()

 return (
  <div className="min-h-[85vh] flex items-center justify-center p-6">
    <div className="w-full max-w-sm bg-zinc-900/70 backdrop-blur-md border border-zinc-700 rounded-2xl p-8 shadow-lg text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
        Something went wrong
      </p>

      <h1 className="text-6xl font-black text-zinc-100 mb-3">404</h1>

      <p className="text-sm text-zinc-400 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="w-full py-2 text-sm font-semibold rounded-xl bg-zinc-200 text-zinc-900 hover:bg-white transition-all"
      >
        Back to home
      </button>
    </div>
  </div>
);
}

export default Error
