"use client";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="w-full bg-[#f1f5f9] py-0 px-0 h-[500px] relative">
      {/* Hero Content */}
      <div className="absolute left-[200px] top-[140px] text-left">
        <h2 className="text-4xl font-bold text-[#334155]">
          Welcome to Your Complete
        </h2>
        <h2 className="text-4xl font-bold text-[#334155] mt-5">
          ERM Solution
        </h2>

        {/* Subtext */}
        <div className="mt-14">
          <p className="text-xl text-[#64748b]">
            Streamline your business processes with our
          </p>
          <p className="text-xl text-[#64748b]">
            integrated platform for inventory management,
          </p>
          <p className="text-xl text-[#64748b]">
            sales tracking, and enterprise resource planning.
          </p>
        </div>

        {/* Get Started Button */}
        <button
          onClick={() => router.push("/get-started")}
          className="mt-10 bg-black text-white px-6 py-3 rounded text-xl h-[60px] w-[180px]"
        >
          Get Started
        </button>
      </div>

      {/* Modern Graphics Element */}
      <div className="absolute right-[120px] top-[50px]">
        <div className="relative w-[300px] h-[300px]">
          {/* Background shapes */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-[#e2e8f0] opacity-60 left-0 top-0"></div>
          <div className="absolute w-[300px] h-[300px] rounded-2xl bg-[#cbd5e1] opacity-40 left-0 top-0"></div>
          <div className="absolute bg-[#94a3b8] opacity-50" style={{ clipPath: "polygon(0 0, 100% 33%, 50% 100%)" }}></div>
          
          {/* Dashboard Illustration */}
          <div className="absolute left-[30px] top-[40px] w-[240px] h-[160px] bg-white rounded border-2 border-[#64748b]">
            <div className="bg-[#e2e8f0] h-5 m-2 rounded"></div>
            <div className="flex mt-2 mx-2">
              <div className="bg-[#f1f5f9] border border-[#cbd5e1] h-20 w-1/2 mr-2 rounded"></div>
              <div className="bg-[#f1f5f9] border border-[#cbd5e1] h-20 w-1/2 rounded"></div>
            </div>
            <div className="bg-[#e2e8f0] h-5 m-2 mt-3 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
}