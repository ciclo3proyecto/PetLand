import {Entity, model, property} from '@loopback/repository';

@model()
export class DetallePedidos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'string',
  })
  pedidosId?: string;

  @property({
    type: 'string',
  })
  productosServiciosId?: string;

  constructor(data?: Partial<DetallePedidos>) {
    super(data);
  }
}

export interface DetallePedidosRelations {
  // describe navigational properties here
}

export type DetallePedidosWithRelations = DetallePedidos & DetallePedidosRelations;
