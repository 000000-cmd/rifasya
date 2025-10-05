import { DataFetch } from "./DataFetch";  
import { environment } from "../../../environments/environments";

export const API = environment.apiUrl

function ensureBody(body: unknown): BodyInit | null {
  if (typeof body === "object" && !(body instanceof FormData)) {
    return JSON.stringify(body);
  }
  return body as BodyInit;
}
function buildHeaders(custom: Record<string, string>) {
  return {
    "Content-Type": "application/json",
    ...custom,
  };
}

// ---- GET ----
export async function GET(data: DataFetch) {
  return await fetch(`${API}/${data.url}`, {
    method: "GET",
    credentials: "include",
    headers: buildHeaders(data.headers),
  });
}

// ---- POST ----
export async function POST(data: DataFetch) {
  return await fetch(`${API}/${data.url}`, {
    method: "POST",
    credentials: "include",
    headers: buildHeaders(data.headers),
    body: ensureBody(data.body),
  });
}

// ---- PUT ----
export async function PUT(data: DataFetch) {
  return await fetch(`${API}/${data.url}`, {
    method: "PUT",
    credentials: "include",
    headers: buildHeaders(data.headers),
    body: ensureBody(data.body),
  });
}

// ---- DELETE ----
export async function DELETE_REQ(data: DataFetch) {
  return await fetch(`${API}/${data.url}`, {
    method: "DELETE",
    credentials: "include",
    headers: buildHeaders(data.headers),
    body: ensureBody(data.body),
  });
}
