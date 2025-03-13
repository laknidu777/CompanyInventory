"use client";
import { useRouter } from "next/navigation";
import Header from "../../components/welcomePage/Header/page";
import Footer from "../../components/welcomePage/Footer/page";

export default function LoginPage() {
    const router = useRouter();
    return (
      <div className="min-h-screen flex flex-col gap-8 bg-white">
        <Header />
        <div className="flex flex-1 justify-center items-center">
          <div className="bg-gray-100 shadow-md p-8 rounded-lg w-96 border border-gray-300">
            <h2 className="text-2xl font-bold text-center text-black">Login</h2>
            <p className="text-center text-gray-600">You are logging in as:</p>
            <form className="space-y-4 mt-2 text-black">
              <div className="space-y-2">
                <label className="block"><input type="radio" name="role" className="mr-2"/> Business Owner</label>
                <label className="block"><input type="radio" name="role" className="mr-2"/> Employee</label>
                <label className="block"><input type="radio" name="role" className="mr-2"/> Client</label>
              </div>
              <input placeholder="Email" className="border p-2 w-full rounded" />
              <input type="password" placeholder="Password" className="border p-2 w-full rounded" />
              <div className="flex justify-between text-sm text-blue-500">
                <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
              </div>
              <button type="button" className="bg-black text-white px-4 py-2 rounded-lg w-full" onClick={() => router.push("/dashboard/owner")}>Login</button>
              <p className="text-center text-gray-600">Don't have an account? <a href="/auth/signup" className="text-blue-500 font-bold hover:underline">Sign Up</a></p>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }