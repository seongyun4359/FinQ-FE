import { useState, useRef, useEffect } from "react";
import ChatMessage from "../../components/ChatMessage";
import ChatInput from "../../components/ChatInput";
import Sidebar from "../../components/layout/Sidebar";
import { Chat } from "../../types";

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 채팅이 업데이트될 때마다 스크롤 최하단으로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "새로운 대화",
      messages: [],
    };
    setChats((prev) => [...prev, newChat]);
    setActiveChat(newChat.id);
  };

  const handleSendMessage = (message: string, file?: File | null) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChat) {
          const newMessage = {
            role: "user" as const,
            content: message,
            file: file
              ? {
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  url: URL.createObjectURL(file),
                }
              : undefined,
          };
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      })
    );

    // 메시지 전송 후 스크롤을 최하단으로 이동 (부드러운 스크롤)
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleUpdateChatTitle = (chatId: string, newTitle: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title: newTitle,
            }
          : chat
      )
    );
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
        onUpdateChatTitle={handleUpdateChatTitle}
      />

      {/* 메인 채팅 영역 */}
      <main className="flex-1 ml-64 w-full">
        <div className="flex h-screen flex-col">
          {/* 채팅 영역 */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto pt-16 pb-32 scroll-smooth"
          >
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
