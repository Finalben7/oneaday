import useDarkMode from "../hooks/useDarkMode";

const Header = () => {
  const { toggleTheme, theme } = useDarkMode();

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow text-black dark:text-white">
      <h1 className="text-xl font-bold">OneADay</h1>
      <div className="space-x-4 flex items-center">
        <button className="px-4 py-2 border rounded">Login</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Sign Up</button>
        <button
          onClick={toggleTheme}
          className="px-2 py-2 border rounded text-sm"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
};


export default Header;