import { useMemo, useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import { initialConversations } from "../data/conversations";
import type { Conversation, Message } from "../types/chat";
import { createConversationTitle } from "../utils/createConversationTitle";
import { generateDummyReply } from "../utils/generateDummyReply";

function AIChatPage() {
    const [conversations, setConversations] =
        useState<Conversation[]>(initialConversations);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(
        initialConversations[0]?.id ?? null
    );
    const [isTyping, setIsTyping] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const activeConversation = useMemo(() => {
        return conversations.find((item) => item.id === activeConversationId) ?? null;
    }, [conversations, activeConversationId]);

    function getCurrentTime() {
        return new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        });
    }

    function handleNewChat() {
        const newConversation: Conversation = {
            id: crypto.randomUUID(),
            title: "New Chat",
            updatedAt: "Just now",
            messages: [],
        };

        setConversations((prev) => [newConversation, ...prev]);
        setActiveConversationId(newConversation.id);
        setMobileSidebarOpen(false);
    }

    function handleSendMessage(input: string) {
        let conversationId = activeConversationId;

        if (!conversationId) {
            const newConversation: Conversation = {
                id: crypto.randomUUID(),
                title: createConversationTitle(input),
                updatedAt: "Just now",
                messages: [],
            };

            setConversations((prev) => [newConversation, ...prev]);
            setActiveConversationId(newConversation.id);
            conversationId = newConversation.id;
        }

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: input,
            timestamp: getCurrentTime(),
        };

        setConversations((prev) =>
            prev.map((conversation) => {
                if (conversation.id !== conversationId) return conversation;

                const nextTitle =
                    conversation.messages.length === 0
                        ? createConversationTitle(input)
                        : conversation.title;

                return {
                    ...conversation,
                    title: nextTitle,
                    updatedAt: "Just now",
                    messages: [...conversation.messages, userMessage],
                };
            })
        );

        setIsTyping(true);

        setTimeout(() => {
            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: generateDummyReply(input),
                timestamp: getCurrentTime(),
            };

            setConversations((prev) =>
                prev.map((conversation) => {
                    if (conversation.id !== conversationId) return conversation;

                    return {
                        ...conversation,
                        updatedAt: "Just now",
                        messages: [...conversation.messages, assistantMessage],
                    };
                })
            );

            setIsTyping(false);
        }, 1200);
    }

    function handleSelectPrompt(prompt: string) {
        handleSendMessage(prompt);
    }

    return (
        <div className="min-h-screen bg-[#e9e9ee] px-2 py-2 sm:px-4 sm:py-4">
            <div className="mx-auto h-[calc(100vh-16px)] max-w-[1400px] overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:h-[calc(100vh-32px)]">
                <div className="flex h-full">
                    <div className="hidden w-[290px] lg:block">
                        <Sidebar
                            conversations={conversations}
                            activeConversationId={activeConversationId}
                            onSelectConversation={setActiveConversationId}
                            onNewChat={handleNewChat}
                        />
                    </div>

                    {mobileSidebarOpen && (
                        <div className="fixed inset-0 z-50 bg-black/30 lg:hidden">
                            <div className="h-full w-[290px] bg-white">
                                <Sidebar
                                    conversations={conversations}
                                    activeConversationId={activeConversationId}
                                    onSelectConversation={setActiveConversationId}
                                    onNewChat={handleNewChat}
                                    onCloseMobile={() => setMobileSidebarOpen(false)}
                                />
                            </div>
                        </div>
                    )}

                    <ChatWindow
                        title={activeConversation?.title ?? "ChatGPT"}
                        messages={activeConversation?.messages ?? []}
                        isTyping={isTyping}
                        onSendMessage={handleSendMessage}
                        onSelectPrompt={handleSelectPrompt}
                        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
                    />
                </div>
            </div>
        </div>
    );
}

export default AIChatPage;