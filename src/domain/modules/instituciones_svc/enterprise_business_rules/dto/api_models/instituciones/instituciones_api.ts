export class InstitucionesApi {

    id: string;
    nombre: string;
    municipio_id: string;
    codigo_dane: string;
    tipo: string;
    sector: string;

    constructor(item: any) {
        this.id = item.id;
        this.nombre = item.nombre;
        this.municipio_id = item.municipio_id;
        this.codigo_dane = item.codigo_dane;
        this.tipo = item.tipo;
        this.sector = item.sector;
    }
}
