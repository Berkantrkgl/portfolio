import { Fragment, type ReactNode } from "react";

/**
 * Renders `**bold**` spans inside copy strings. The dictionary keeps emphasis
 * in the text so translators see it in context rather than in JSX.
 */
export function renderEmphasis(text: string, className = "font-bold"): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className={className}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
