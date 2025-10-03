import { DataFetch } from "../../../shared/models/DataFetch";
import { parseResponse } from "../../../shared/utils/ValidateResponse";
import { GET } from "../Api.service";

interface DocumentType {
  id: number;
  name: string;
  order: number; // propiedad por la que quieres ordenar
}

export async function getTypeDocuments() {

    const listDocuments: DocumentType[] = [];
    const data = new DataFetch("api/lists/documenttypes");

    try {
        const response = await GET(data);
        const result = await parseResponse(response);

        if (result.ok) {
            let listDoc: DocumentType[] = result.data;

            listDoc.sort((a, b) => a.order - b.order);

            listDocuments.push(...listDoc);

        } else {
            console.log(
                "Hubo un error al obtener el listado de documentos:",
                result.status,
                result.statusText
            );
        }

        return listDocuments;

    } catch (error) {
        console.error("Error interno al obtener el listado de documentos:", error);
        return listDocuments;
    }
}
