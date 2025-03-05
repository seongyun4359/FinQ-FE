interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center gap-4 shrink-0">
      <button
        onClick={onToggleSidebar}
        className="text-gray-700 hover:bg-gray-100 p-2 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <h1 className="text-xl font-semibold text-gray-800 text-center flex-1">
        Building list modals
      </h1>
    </header>
  );
}
