import { useState } from "react";
import { SidebarProps } from "../../types";
import LoginModal from "../auth/LoginModal";

export default function Sidebar({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
  onUpdateChatTitle,
}: SidebarProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleEditStart = (chat: { id: string; title: string }) => {
    setEditingChatId(chat.id);
    setEditTitle(chat.title);
  };

  const handleEditSubmit = (chatId: string) => {
    if (editTitle.trim()) {
      onUpdateChatTitle(chatId, editTitle.trim());
    }
    setEditingChatId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, chatId: string) => {
    if (e.key === "Enter") {
      handleEditSubmit(chatId);
    } else if (e.key === "Escape") {
      setEditingChatId(null);
    }
  };

  return (
    <>
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
            <div
              key={chat.id}
              className={`group flex items-center justify-between p-3 hover:bg-gray-100 ${
                activeChat === chat.id ? "bg-gray-100" : ""
              }`}
            >
              {editingChatId === chat.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => handleEditSubmit(chat.id)}
                  onKeyDown={(e) => handleKeyDown(e, chat.id)}
                  className="flex-1 px-2 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className="flex items-center gap-3 text-gray-700 flex-1 text-left"
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
                  <span className="truncate">{chat.title}</span>
                </button>
              )}

              {!editingChatId && (
                <button
                  onClick={() => handleEditStart(chat)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-md transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 로그인 버튼 */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#051C3F] text-white rounded-md hover:bg-[#0A2E5C] transition-colors"
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            로그인
          </button>
        </div>
      </div>

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
