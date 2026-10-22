import { useState } from "react";
import service from "../../services/index.services";
import { Link } from "react-router-dom"

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState ("")

const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault()

service.post("/auth/forgot-password", {email})
.then((response) => {
    setMessage(response.data.message)
})
.catch((error) => {
    setMessage(error.response?.data?.errormessage || "Something went wrong") 
})
}

const inputStyle =
  "w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400";

return (
    <div>
    <div className="min-h-[85vh] flex items-center justify-center p-6">
  <div className="w-full max-w-sm bg-zinc-900/70 backdrop-blur-md border border-zinc-700 rounded-2xl p-6 shadow-lg">
    <h1 className="text-2xl font-bold text-zinc-100 mb-1">Forgot password?</h1>
    <p className="text-sm text-zinc-400 mb-5">
      Enter your email and we'll send you a link to reset it.
    </p>

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-zinc-400">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          required
          className={inputStyle}
        />
      </div>

      <button
        type="submit"
        className="mt-1 py-2 text-sm font-semibold rounded-xl bg-zinc-200 text-zinc-900 hover:bg-white transition-all"
      >
        Send reset link
      </button>
    </form>

    {message && <p className="text-sm text-zinc-300 font-semibold mt-4">{message}</p>}

    <p className="text-sm text-zinc-400 mt-4 text-center">
      <Link to="/login" className="text-zinc-200 hover:underline">
        Back to login
      </Link>
    </p>
    </div>
    </div>
  </div>
)
}

export default ForgotPassword