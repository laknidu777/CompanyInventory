"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../../components/welcomePage/Header/page";
import Footer from "../../components/welcomePage/Footer/page";

export default function SignupPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:5000/api/register", data);
      router.push("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white shadow-md p-6 rounded-lg w-96">
          <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register("email")} placeholder="Email" className="border p-2 w-full" />
            <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full" />
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg w-full">Sign Up</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
