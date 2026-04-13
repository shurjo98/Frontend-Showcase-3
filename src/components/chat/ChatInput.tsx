import { FileText, Image, Mic, Plus, SendHorizontal, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AttachmentItem = {
  id: string;
  type: "file" | "image";
  name: string;
};

type Props = {
  onSendMessage: (message: string) => void;
};

function ChatInput({ onSendMessage }: Props) {
  const [value, setValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function handleSend() {
    const trimmed = value.trim();

    if (!trimmed && attachments.length === 0) return;

    const attachmentText =
      attachments.length > 0
        ? `\n\nAttachments: ${attachments.map((item) => item.name).join(", ")}`
        : "";

    onSendMessage(`${trimmed || "Please review these attachments."}${attachmentText}`);

    setValue("");
    setAttachments([]);
    setMenuOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function addFakeFile() {
    setAttachments((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "file",
        name: "Project-Brief.pdf",
      },
    ]);
    setMenuOpen(false);
  }

  function addFakeImage() {
    setAttachments((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "image",
        name: "ui-reference.png",
      },
    ]);
    setMenuOpen(false);
  }

  function useTemplatePrompt() {
    setValue(
      "Please summarize the attached file and turn it into a clean action plan."
    );
    setMenuOpen(false);
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="bg-slate-100 px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-3xl">
        <div className="relative rounded-[28px] border border-slate-200 bg-white px-3 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute bottom-[calc(100%+12px)] left-3 z-20 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
            >
              <button
                onClick={addFakeFile}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <FileText size={16} className="text-slate-500" />
                <div>
                  <p className="font-medium text-slate-800">Attach file</p>
                  <p className="text-xs text-slate-400">Add a document to this chat</p>
                </div>
              </button>

              <button
                onClick={addFakeImage}
                className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <Image size={16} className="text-slate-500" />
                <div>
                  <p className="font-medium text-slate-800">Upload image</p>
                  <p className="text-xs text-slate-400">Attach a visual reference</p>
                </div>
              </button>

              <button
                onClick={useTemplatePrompt}
                className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <Sparkles size={16} className="text-slate-500" />
                <div>
                  <p className="font-medium text-slate-800">Use template prompt</p>
                  <p className="text-xs text-slate-400">Insert a ready-made prompt</p>
                </div>
              </button>
            </div>
          )}

          {attachments.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2 px-2 pt-1">
              {attachments.map((item) => (
                <div
                  key={item.id}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700"
                >
                  {item.type === "file" ? (
                    <FileText size={13} className="text-slate-500" />
                  ) : (
                    <Image size={13} className="text-slate-500" />
                  )}

                  <span>{item.name}</span>

                  <button
                    onClick={() => removeAttachment(item.id)}
                    className="rounded-full p-0.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask anything"
            className="max-h-40 min-h-[44px] w-full resize-none bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />

          <div className="mt-1 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                  menuOpen
                    ? "bg-slate-200 text-slate-800"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <Plus size={16} />
              </button>

              <button className="rounded-full px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100">
                Tools
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100">
                <Mic size={16} />
              </button>

              <button
                onClick={handleSend}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700"
              >
                <SendHorizontal size={15} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Intelligent Assistant can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

export default ChatInput;