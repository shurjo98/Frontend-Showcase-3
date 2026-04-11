export function generateDummyReply(input: string): string {
  const text = input.toLowerCase();

  if (text.includes("react")) {
    return "React is a JavaScript library for building user interfaces. The key idea is to break the UI into reusable components and manage changing data with state.";
  }

  if (text.includes("portfolio")) {
    return "A strong frontend portfolio should show clean layouts, reusable components, responsive design, and a few interactive projects that feel close to real products.";
  }

  if (text.includes("product")) {
    return "A good product description should focus on benefits first, then key features, then a clear call to action. Keep the wording easy to scan.";
  }

  if (text.includes("interesting") || text.includes("new")) {
    return "Here’s something interesting: Octopuses have three hearts, and two of them stop beating when they swim. That’s one reason they prefer crawling over the sea floor.";
  }

  return "That’s a great prompt. For this demo, I’m simulating an AI assistant with realistic chat flow, typing feedback, and conversation history.";
}