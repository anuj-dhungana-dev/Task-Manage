import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullname) {
      toast.error("Please enter your name");
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Please enter the password");
      setError("Please enter the password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/v1/api/auth/register",
        { fullname, email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        setLoading(false);
        return;
      }

      toast.success(res.data.message);
      setError("");

      // clear input fields
      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Signup failed";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7 text-center">REGISTER</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={fullname}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="input-box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Signing up..." : "SIGN UP"}
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-[#2B85FF] underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
