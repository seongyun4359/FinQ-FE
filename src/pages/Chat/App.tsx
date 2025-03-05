import { useState } from "react";
import ChatMessage from "../../components/ChatMessage";
import ChatInput from "../../components/ChatInput";
import Sidebar from "../../components/Sidebar";
import { Chat } from "../../types";

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "새로운 대화",
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
    // TODO: AI 응답 로직 추가
  };

  const currentChat = chats.find((chat) => chat.id === activeChat);

  return (
    <div className="flex">
      {/* 사이드바 */}
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        onNewChat={handleNewChat}
      />

      {/* 메인 채팅 영역 */}
      <main className="flex-1 ml-64">
        <div className="flex h-screen flex-col">
          {/* 헤더 */}
          <header className="bg-[#202123] p-4 fixed w-[calc(100%-16rem)] z-10">
            <h1 className="text-2xl font-bold text-white text-center">FinQ</h1>
          </header>

          {/* 채팅 영역 */}
          <div className="flex-1 overflow-y-auto pt-16 pb-32">
            {!currentChat || currentChat.messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-300">
                  <h2 className="text-2xl font-bold mb-4">
                    금융 지식이 궁금하신가요?
                  </h2>
                  <p className="text-lg">FinQ에게 무엇이든 물어보세요!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 px-4 py-8">
                {currentChat.messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </div>
            )}
          </div>

          {/* 입력 영역 */}
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </main>
    </div>
  );
}

export default App;
