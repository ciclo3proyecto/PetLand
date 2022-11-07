import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductosServicios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'number',
    required: true,
  })
  Existencia: number;

  @property({
    type: 'string',
    required: true,
  })
  Tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  Imagen: string;


  constructor(data?: Partial<ProductosServicios>) {
    super(data);
  }
}

export interface ProductosServiciosRelations {
  // describe navigational properties here
}

export type ProductosServiciosWithRelations = ProductosServicios & ProductosServiciosRelations;
