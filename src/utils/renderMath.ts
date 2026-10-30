import katex from "katex";

/**
 * Parses mixed text containing LaTeX formulas:
 * - $$...$$ -> Display math
 * - $...$ -> Inline math
 * Replaces them with pre-rendered KaTeX HTML.
 */
export function renderMathInText(text: string): string {
  if (!text) return "";

  // 1. Replace display math $$...$$
  let result = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return `$$${math}$$`;
    }
  });

  // 2. Replace inline math $...$ (avoiding double dollars)
  result = result.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `$${math}$`;
    }
  });

  return result;
}

/**
 * Directly renders a pure LaTeX formula string into KaTeX HTML.
 */
export function renderFormula(formula: string, displayMode = false): string {
  if (!formula) return "";
  try {
    return katex.renderToString(formula.trim(), {
      displayMode,
      throwOnError: false,
    });
  } catch {
    return formula;
  }
}
