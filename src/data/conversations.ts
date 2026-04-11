import type { Conversation } from "../types/chat";

export const initialConversations: Conversation[] = [
  {
    id: "conv-1",
    title: "Typo Assistance Request",
    updatedAt: "2m ago",
    messages: [],
  },
  {
    id: "conv-2",
    title: "Quadratic Function Plot",
    updatedAt: "10m ago",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "Tell me something new today",
        timestamp: "10:42 AM",
      },
      {
        id: "msg-2",
        role: "assistant",
        content:
          "Here’s something fascinating: scientists discovered a plant that glows faintly in the dark naturally. It’s a rare liverwort species found in Borneo, and its bioluminescence may help attract insects and support spore dispersal.",
        timestamp: "10:43 AM",
      },
    ],
  },
  {
    id: "conv-3",
    title: "Urban Green Spaces",
    updatedAt: "1h ago",
    messages: [],
  },
];