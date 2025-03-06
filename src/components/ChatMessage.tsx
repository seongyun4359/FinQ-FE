import { ChatMessageProps } from "../types";
import { useEffect, useState } from "react";

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isImage = message.file?.type.startsWith("image/");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 약간의 지연 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div
      className={`flex items-end gap-2 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* 프로필 아바타 */}
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 ${
          isUser ? "bg-[#051C3F]" : "bg-blue-100"
        } flex items-center justify-center ${
          isVisible ? "animate-fadeIn" : "opacity-0"
        }`}
      >
        {isUser ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        ) : (
          <img src="/FinQ.svg" alt="FinQ" className="w-5 h-5" />
        )}
      </div>

      {/* 메시지 컨테이너 */}
      <div
        className={`max-w-[70%] ${
          isVisible
            ? isUser
              ? "animate-slideRightFade"
              : "animate-slideLeftFade"
            : "opacity-0"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-2 ${
            isUser
              ? "bg-[#051C3F] text-white rounded-br-none"
              : "bg-gray-100 text-gray-700 rounded-bl-none"
          }`}
        >
          {/* 메시지 내용 */}
          <div className="whitespace-pre-wrap">{message.content}</div>

          {/* 파일 첨부 */}
          {message.file && (
            <div
              className={`mt-2 pt-2 border-t ${
                isUser ? "border-gray-600" : "border-gray-200"
              }`}
            >
              {isImage ? (
                // 이미지 파일인 경우
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(message.file as unknown as Blob)}
                    alt={message.file.name}
                    className="max-w-full rounded-md"
                  />
                  <div
                    className={`mt-1 text-sm ${
                      isUser ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {message.file.name} ({formatFileSize(message.file.size)})
                  </div>
                </div>
              ) : (
                // 기타 파일인 경우
                <div
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    isUser ? "bg-[#0a2850]" : "bg-white"
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
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <div className="flex-1 truncate">
                    <div className="font-medium truncate">
                      {message.file.name}
                    </div>
                    <div
                      className={`text-sm ${
                        isUser ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {formatFileSize(message.file.size)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
