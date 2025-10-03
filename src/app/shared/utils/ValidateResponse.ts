
// helper para procesar respuestas de fetch
export async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type");
  let data;

  try {
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    // fallback si el body no es parseable
    data = null;
  }

  if (response.ok) {
    return { ok: true, status: response.status, data };
  } else {
    return { ok: false, status: response.status, statusText: response.statusText, data };
  }
}
