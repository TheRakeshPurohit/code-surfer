import React from "react";
import { useDeck } from "mdx-deck";
import CodeSurfer from "./code-surfer";
import { readStepFromElement } from "./step-reader";
import ErrorBoundary from "./error-boundary";

function CodeSurferLayout({ children, ...props }) {
  const deck = useDeck();
  const steps = React.useMemo(getStepsFromChildren(children), [deck.index]);
  const lang = steps.length && steps[0].lang;

  return (
    <div
      style={{
        width: "100vw",
        maxWidth: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CodeSurfer steps={steps} lang={lang} />
    </div>
  );
}

const getStepsFromChildren = children => () => {
  return React.Children.toArray(children)
    .map(readStepFromElement)
    .filter(x => x);
};

export default props => (
  <ErrorBoundary>
    <CodeSurferLayout {...props} />
  </ErrorBoundary>
);
