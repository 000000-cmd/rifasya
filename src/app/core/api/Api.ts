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

  // 1. Intentar obtener el token del localStorage.
  const tokenString = localStorage.getItem('accessToken');

  // 2. Verificar si se encontró un token.
  if (tokenString) {
    // 3. Limpiar el token de posibles comillas ("...") o espacios extra.
    const cleanToken = tokenString.trim().replace(/^"|"$/g, '');

    if (cleanToken) {
      // 4. Añadir el encabezado de autorización.
      headers['Authorization'] = `Bearer ${cleanToken}`;
      // Mensaje útil para depuración en la consola del navegador.
      console.log("Token de autorización enviado.");
    }
  } else {
    // Si no se encuentra ningún token, mostrar una advertencia en la consola.
    console.warn("No se encontró 'accessToken' en localStorage. La petición se enviará sin autenticación.");
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

// ---- PATCH ----
export async function PATCH(data: DataFetch) {
  return await fetch(`${API}/${data.url}`, {
    method: "PATCH",
    credentials: "include",
    headers: buildHeaders(data.headers),
    body: ensureBody(data.body),
  });
}
