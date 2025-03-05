import { ChatMessageProps } from "../types";

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isUser ? "bg-[#2970ff] text-white" : "bg-gray-100 text-gray-700"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
