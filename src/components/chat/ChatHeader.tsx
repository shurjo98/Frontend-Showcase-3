import { Menu, Share2 } from "lucide-react";
import avatarImg from "../../assets/avatar.png";

type Props = {
    title: string;
    onOpenMobileSidebar: () => void;
};

function ChatHeader({ title, onOpenMobileSidebar }: Props) {
    return (
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onOpenMobileSidebar}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
                >
                    <Menu size={18} />
                </button>

                <div>
                    <p className="text-sm font-semibold text-slate-900">{title}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="hidden rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:bg-slate-100 sm:block">
                    Temporary
                </button>

                <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:bg-slate-100">
                    <span className="inline-flex items-center gap-1">
                        <Share2 size={12} />
                        Share
                    </span>
                </button>

                <img
                    src={avatarImg}
                    alt="User avatar"
                    className="h-8 w-8 rounded-full object-cover border border-slate-200"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                            "https://ui-avatars.com/api/?name=User";
                    }}
                />
            </div>
        </header>
    );
}

export default ChatHeader;