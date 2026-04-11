import type { Message } from "../../types/chat";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";
import MessageList from "./MessageList";

type Props = {
  title: string;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onSelectPrompt: (prompt: string) => void;
  onOpenMobileSidebar: () => void;
};

function ChatWindow({
  title,
  messages,
  isTyping,
  onSendMessage,
  onSelectPrompt,
  onOpenMobileSidebar,
}: Props) {
  const isEmpty = messages.length === 0;

  return (
    <section className="flex h-full flex-1 flex-col bg-slate-100">
      <ChatHeader title={title} onOpenMobileSidebar={onOpenMobileSidebar} />

      {isEmpty ? (
        <EmptyState onSelectPrompt={onSelectPrompt} />
      ) : (
        <MessageList messages={messages} isTyping={isTyping} />
      )}

      <ChatInput onSendMessage={onSendMessage} />
    </section>
  );
}

export default ChatWindow;