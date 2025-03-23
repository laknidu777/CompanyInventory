"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../utils/config";  
import Header from "../../components/welcomePage/Header/page";
import Footer from "../../components/welcomePage/Footer/page";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Business Owner"); 
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); 

    try {
      const response = await fetch(`${API_BASE_URL}/api/business-owners/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Ensures cookies are stored
        body: JSON.stringify({ bo_email: email, bo_password: password, bo_role: role }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ No need to store JWT manually; it's in an HTTP-only cookie
        if (role === "Business Owner") {
          router.push("/dashboard/owner");
        } else if (role === "Employee") {
          router.push("/dashboard/employee");
        } else {
          router.push("/dashboard/client");
        }
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-8 bg-white">
      <Header />
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-gray-100 shadow-md p-8 rounded-lg w-96 border border-gray-300">
          <h2 className="text-2xl font-bold text-center text-black">Login</h2>
          <p className="text-center text-gray-600">You are logging in as:</p>

          {/* Role Selection */}
          <div className="space-y-2 text-gray-700 mt-2">
            <label className="block">
              <input type="radio" name="role" value="Business Owner" className="mr-2"
                checked={role === "Business Owner"} onChange={(e) => setRole(e.target.value)} /> 
              Business Owner
            </label>
            <label className="block">
              <input type="radio" name="role" value="Employee" className="mr-2"
                checked={role === "Employee"} onChange={(e) => setRole(e.target.value)} />
              Employee
            </label>
            <label className="block">
              <input type="radio" name="role" value="Client" className="mr-2"
                checked={role === "Client"} onChange={(e) => setRole(e.target.value)} />
              Client
            </label>
          </div>

          {/* Login Form */}
          <form className="space-y-4 mt-2 text-black" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email" className="border p-2 w-full rounded"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="border p-2 w-full rounded"
              value={password} onChange={(e) => setPassword(e.target.value)} required />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="button" className="bg-black text-white px-4 py-2 rounded-lg w-full hover:bg-gray-700"
              onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
