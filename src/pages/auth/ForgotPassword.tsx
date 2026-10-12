import { useState } from "react";
import service from "../../services/index.services";
import { Link } from "react-router-dom"

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState ("")

const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) =>
 e.preventDefault()

service.post("/auth/forgot-password", {email})
.then((response) => {
    setMessage(response.data.message)
})
.catch((error) => {
    setMessage(error.response?.data?.errorMessage || "Something went wrong") 
})

 return (
  <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
    <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
      <h1 className="text-xl font-bold text-zinc-100 mb-2">Forgot password?</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Enter your email and we'll send you a link to reset it.
      </p>

      <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-zinc-100 text-zinc-900 font-semibold py-2 text-sm hover:bg-white"
        >
          Send reset link
        </button>
      </form>

      {message && <p className="text-sm text-zinc-300 mt-4">{message}</p>}

      <Link to="/login" className="block text-sm text-zinc-400 hover:text-zinc-200 mt-6">
        Back to login
      </Link>
    </div>
  </div>
);
}

export default ForgotPassword
