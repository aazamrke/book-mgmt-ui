import api from "./axios";

export const ragQuery = (query) =>
  api.post("/rag/query", { query });
