export function createConversationTitle(message: string): string {
  const trimmed = message.trim();

  if (!trimmed) return "New Chat";

  const words = trimmed.split(/\s+/).slice(0, 4);
  return words.join(" ");
}