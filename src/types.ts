export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatMessageProps {
  message: Message;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
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
}
