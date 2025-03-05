import { useState } from "react";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import Sidebar from "./components/Sidebar";
import { Chat } from "./types";

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };
    setChats((prev) => [...prev, newChat]);
    setActiveChat(newChat.id);
  };

  const handleSendMessage = (message: string) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [...chat.messages, { role: "user", content: message }],
          };
        }
        return chat;
      })
    );
  };

  const currentChat = chats.find((chat) => chat.id === activeChat);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* 사이드바 */}
      <div
        className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out z-20`}
      >
        <Sidebar
          chats={chats}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
          onNewChat={handleNewChat}
        />
      </div>

      {/* 메인 채팅 영역 */}
      <main
        className={`flex-1 flex flex-col min-h-screen bg-white transition-all duration-300 ease-in-out `}
      >
        {/* 채팅 영역 */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-5xl px-4 py-4">
            {!currentChat || currentChat.messages.length === 0 ? (
              <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <h2 className="text-2xl font-semibold mb-4">
                    How can I help you today?
                  </h2>
                </div>
              </div>
            ) : (
              <div className="space-y-4 min-h-[calc(100vh-8rem)]">
                {currentChat.messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="border-t border-gray-200 bg-white shrink-0">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </main>
    </div>
  );
}

export default App;
