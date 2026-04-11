import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import type { Message } from "../../types/chat";

type Props = {
    message: Message;
};

function MessageBubble({ message }: Props) {
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className="flex max-w-[85%] gap-3 sm:max-w-[70%]">
                {/* AI Avatar */}
                {!isUser && (
                    <div className="mt-1 flex !h-12 !w-12 shrink-0 items-center justify-center rounded-full text-white text-2xl">
                        🤖
                    </div>
                )}

                <div>
                    {/* Bubble */}
                    <div
                        className={`rounded-2xl px-4 py-3 text-md leading-7 shadow-sm ${isUser
                                ? "rounded-md bg-slate-600 text-slate-100"
                                : "rounded-md bg-slate-600 text-slate-100"
                            }`}
                    >
                        {message.content}
                    </div>

                    {/* Actions */}
                    {!isUser && (
                        <div className="mt-2 flex items-center gap-8 text-slate-400">
                            <button className="p-1 hover:text-slate-700">
                                <Copy size={14} />
                            </button>
                            <button className="p-1 hover:text-slate-700">
                                <ThumbsUp size={14} />
                            </button>
                            <button className="p-1 hover:text-slate-700">
                                <ThumbsDown size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessageBubble;