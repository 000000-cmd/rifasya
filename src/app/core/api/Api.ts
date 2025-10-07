import { DataFetch } from "./DataFetch";
import { environment } from "../../../environments/environments";

export const API = environment.apiUrl

// Función auxiliar para asegurar que el body es del tipo correcto
function ensureBody(body: unknown): BodyInit | null {
  if (body === null || body === undefined) {
    return null;
  }
  if (typeof body === "object" && !(body instanceof FormData)) {
    return JSON.stringify(body);
  }
  return body as BodyInit;
}

function buildHeaders(custom: Record<string, string>): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...custom,
  };

  // Obtenemos el token desde el servicio de autenticación
  const token = localStorage.getItem('accessToken'); // Usamos la misma clave que en AuthService

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
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
