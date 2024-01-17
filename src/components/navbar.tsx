import {ThemeToggle} from "./theme-toggle";

export default function Navbar() {
  return (
    <nav className="w-full overflow-hidden">
      <div className="px-4 py-2 flex items-center justify-end">
        <ThemeToggle />
      </div>
    </nav>
  );
}
