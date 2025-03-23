'use client'; 
export default function Footer() {
  return (
    <footer className="bg-[#1e293b] py-6 text-center text-[#cbd5e1] h-[100px]">
      <p className="mb-3">© 2025 ERM System Inc. All rights reserved.</p>
      <div className="flex justify-center space-x-6">
        <span className="cursor-pointer hover:text-white">Privacy</span>
        <span className="cursor-pointer hover:text-white">Terms</span>
        <span className="cursor-pointer hover:text-white">Contact</span>
      </div>
    </footer>
  );
}