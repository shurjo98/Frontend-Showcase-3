import { promptSuggestions } from "../../data/promptSuggestions";

type Props = {
  onSelectPrompt: (prompt: string) => void;
};

function EmptyState({ onSelectPrompt }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 pb-12 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        What can I help with?
      </h1>

      <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
        {promptSuggestions.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelectPrompt(prompt)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmptyState;