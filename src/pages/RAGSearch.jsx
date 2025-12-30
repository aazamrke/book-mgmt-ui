import { useState } from "react";
import { ragQuery } from "../api/rag";

export default function RAGSearch() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = async () => {
    const res = await ragQuery(question);
    setAnswer(res.data.answer);
  };

  return (
    <>
      <h2>Ask Your Documents</h2>

      <textarea
        placeholder="Ask a question..."
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />

      <button onClick={ask}>Ask</button>

      {answer && (
        <>
          <h3>Answer</h3>
          <p>{answer}</p>
        </>
      )}
    </>
  );
}
