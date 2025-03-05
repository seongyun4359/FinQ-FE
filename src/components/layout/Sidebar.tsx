import { SidebarProps } from "../types";

export default function Sidebar({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
}: SidebarProps) {
  return (
    <div className="bg-white w-64 h-screen flex flex-col border-r border-gray-200">
      {/* 로고 */}
      <div className="flex justify-center items-center p-4 border-b border-gray-200">
        <img src="/FinQ.svg" alt="FinQ Logo" className="w-40 h-auto" />
      </div>

      {/* 새 채팅 버튼 */}
      <button
        onClick={onNewChat}
        className="flex items-center gap-3 m-3 p-3 rounded-md hover:bg-gray-100 text-gray-700 border border-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        New Chat
      </button>

      {/* 채팅 목록 */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full p-3 text-left hover:bg-gray-100 text-gray-700 flex items-center gap-3 ${
              activeChat === chat.id ? "bg-gray-100" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            {chat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
