import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {ProductosServicios} from './productos-servicios.model';
import {DetallePedidos} from './detalle-pedidos.model';

@model()
export class Pedidos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaPedido: string;

  @property({
    type: 'string',
    required: true,
  })
  EstadoPedido: string;

  @property({
    type: 'string',
  })
  Factura?: string;

  @property({
    type: 'date',
  })
  FechaFactura?: string;

  @property({
    type: 'number',
    required: true,
  })
  Total: number;

  @belongsTo(() => Usuarios)
  usuariosId: string;

  @hasMany(() => ProductosServicios, {through: {model: () => DetallePedidos}})
  productosServicios: ProductosServicios[];

  constructor(data?: Partial<Pedidos>) {
    super(data);
  }
}

export interface PedidosRelations {
  // describe navigational properties here
}

export type PedidosWithRelations = Pedidos & PedidosRelations;
