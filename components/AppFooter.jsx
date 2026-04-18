import { BadgeCheck, Send, Camera } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="mt-10 bg-gradient-to-r from-blue-950 to-sky-900 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-8 sm:grid-cols-3">
        <div>
          <h3 className="mb-3 text-2xl font-bold">Filters</h3>
          <p className="text-sky-100">All</p>
          <p className="text-sky-100">Electronics</p>
        </div>
        <div>
          <h3 className="mb-3 text-2xl font-bold">About Us</h3>
          <p className="text-sky-100">About Us</p>
          <p className="text-sky-100">Contact</p>
        </div>
        <div>
          <h3 className="mb-3 text-2xl font-bold">Follow Us</h3>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue-700 p-2">
              <BadgeCheck className="size-4" />
            </span>
            <span className="rounded-full bg-blue-700 p-2">
              <Send className="size-4" />
            </span>
            <span className="rounded-full bg-blue-700 p-2">
              <Camera className="size-4" />
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-6 text-sm text-sky-100">© 2026 American</div>
    </footer>
  );
}
