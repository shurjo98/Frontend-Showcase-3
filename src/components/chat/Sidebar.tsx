import { MessageSquarePlus, Search, Sparkles, PanelLeftClose } from "lucide-react";
import type { Conversation } from "../../types/chat";

type Props = {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onCloseMobile?: () => void;
};

function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onCloseMobile,
}: Props) {
  return (
    <aside className="flex h-full w-full flex-col bg-slate-50/90">
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
            <Sparkles size={15} className="text-slate-700" />
          </div>
          <span className="text-sm font-semibold text-slate-800">AI Desk</span>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 lg:hidden"
          >
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      <div className="px-3">
        <button
          onClick={onNewChat}
          className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <MessageSquarePlus size={16} />
          New chat
        </button>
      </div>

      <div className="px-3 pt-3">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search chats"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto px-3 pb-4">
        <p className="mb-3 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
          Chats
        </p>

        <div className="space-y-1.5">
          {conversations.map((conversation) => {
            const isActive = conversation.id === activeConversationId;

            return (
              <button
                key={conversation.id}
                onClick={() => {
                  onSelectConversation(conversation.id);
                  onCloseMobile?.();
                }}
                className={`w-full rounded-2xl px-3 py-3 text-left transition ${
                  isActive
                    ? "border border-slate-200 bg-white shadow-sm"
                    : "text-slate-600 hover:bg-white/80 hover:shadow-sm"
                }`}
              >
                <p
                  className={`truncate text-sm ${
                    isActive ? "font-semibold text-slate-900" : "text-slate-700"
                  }`}
                >
                  {conversation.title}
                </p>
                <p className="mt-1 text-xs text-slate-400">{conversation.updatedAt}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-200/80 p-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <p className="text-sm font-medium text-slate-800">Upgrade plan</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            More access to premium AI features
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;