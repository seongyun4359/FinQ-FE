export interface FileInfo {
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  file?: FileInfo;
}

export interface ChatMessageProps {
  message: Message;
}

export interface ChatInputProps {
  onSendMessage: (message: string, file?: File | null) => void;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

export interface SidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onUpdateChatTitle: (chatId: string, newTitle: string) => void;
}
