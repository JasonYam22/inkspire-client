import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import service from "../../services/index.services";

function ResetPassword() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setConfirmPassword(e.target.value);

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    service
      .post("/auth/reset-password", { token, password })
      .then((response) => {
        setSuccessMessage(response.data.message);
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.errorMessage ||
            error.response?.data?.message ||
            "Something went wrong",
        );
      });
  };

  const inputStyle =
    "w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400";

 return (
  <div className="min-h-[85vh] flex items-center justify-center p-6">
    <div className="w-full max-w-sm bg-zinc-900/70 backdrop-blur-md border border-zinc-700 rounded-2xl p-6 shadow-lg">

      {!token ? (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-100 mb-1">Invalid link</h1>
        <p className="text-sm text-red-400 font-semibold mb-5">
          This link is invalid or expired.
        </p>
        <Link
          to="/forgot-password"
          className="text-sm text-zinc-200 hover:underline"
        >
          Request a new link
        </Link>
      </div>) : successMessage ? (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-100 mb-1">
          Password updated
        </h1>
        <p className="text-sm text-zinc-400 mb-5">{successMessage}</p>
        <Link
          to="/login"
          className="inline-block py-2 px-6 text-sm font-semibold rounded-xl bg-zinc-200 text-zinc-900 hover:bg-white transition-all"
        >
          Go to login
        </Link>
      </div>
      ) : (
      <>
        <h1 className="text-2xl font-bold text-zinc-100 mb-1">
          Reset password
        </h1>
        <p className="text-sm text-zinc-400 mb-5">Choose a new password.</p>

        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-zinc-400">
              New password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-zinc-400">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className={inputStyle}
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-400 font-semibold">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="mt-1 py-2 text-sm font-semibold rounded-xl bg-zinc-200 text-zinc-900 hover:bg-white transition-all"
          >
            Save
          </button>
        </form>

        <p className="text-sm text-zinc-400 mt-4 text-center">
          <Link to="/login" className="text-zinc-200 hover:underline">
            Back to login
          </Link>
        </p>
      </>
      )}
    </div>
  </div>
)
}

export default ResetPassword;
