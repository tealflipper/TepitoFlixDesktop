export interface IProducto{
    id: number;
    codigoProducto: String;
    proveedorId: number;
    //TODO: Add proveedor object
    unidadDeMedidaId: number;
    //TODO: add unidadDeMedida object
    descripcion: String;
    marca: String;
    costoPonderado: number;
    //TODO: add other atributes from model
}