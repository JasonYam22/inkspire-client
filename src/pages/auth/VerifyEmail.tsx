import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import service from "../../services/index.services";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [verificationStatus, setStatus] = useState<
    "loading" | "verified" | "error"
  >("loading");
  const status = token ? verificationStatus : "error";
  const [errorMessage, setErrorMessage] = useState(
    "The link is invalid or expired.",
  );

  const requestSent = useRef(false);

  useEffect(() => {
    if (!token || requestSent.current) return;
    requestSent.current = true;

    service
      .get("/auth/verify-email", { params: { token } })
      .then(() => {
        setStatus("verified");
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.errorMessage ||
            "Something went wrong, Please try again.",
        );
        setStatus("error");
      });
  }, [token]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-zinc-900/70 backdrop-blur-md border border-zinc-700 rounded-2xl p-6 shadow-lg text-center">
        {status === "loading" && (
          <>
            <h1 className="text-2xl font-bold text-zinc-100 mb-1">
              Verifying...
            </h1>
            <p className="text-sm text-zinc-400">Please wait a moment.</p>
          </>
        )}

        {status === "verified" && (
          <>
            <h1 className="text-2xl font-bold text-zinc-100 mb-1">
              Email verified
            </h1>
            <p className="text-sm text-zinc-400 mb-5">Your account is ready.</p>
            <Link
              to="/login"
              className="inline-block py-2 px-6 text-sm font-semibold rounded-xl bg-zinc-200 text-zinc-900 hover:bg-white transition-all"
            >
              Go to login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-zinc-100 mb-1">
              Verification failed
            </h1>
            <p className="text-sm text-red-400 font-semibold mb-5">
              {errorMessage}
            </p>
            <Link
              to="/signup"
              className="text-sm text-zinc-200 hover:underline"
            >
              Back to signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
