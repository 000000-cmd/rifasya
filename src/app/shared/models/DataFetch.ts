/**
 * Objeto estándar para peticiones
 * @property url Enlace al cual se hará la petición
 * @property body Datos que se enviarán en el body (puede ser JSON, FormData, string, etc.)
 * @property headers Encabezados personalizados
 */
export class DataFetch {
  constructor(
    public url: string,
    public body: any = null,
    public headers: Record<string, string> = {}
  ) {}

  getSummary(): string {
    return `Body: ${JSON.stringify(this.body)} → URL: ${this.url}`;
  }
}