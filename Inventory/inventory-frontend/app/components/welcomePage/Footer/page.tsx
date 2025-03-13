export default function Footer() {
    return (
      <footer className="bg-gray-800 py-6 text-center text-gray-400">
        <p>© 2025 ERM System Inc. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-6">
          <span className="cursor-pointer hover:text-black">Privacy</span>
          <span className="cursor-pointer hover:text-black">Terms</span>
          <span className="cursor-pointer hover:text-black">Contact</span>
        </div>
      </footer>
    );
  }
  