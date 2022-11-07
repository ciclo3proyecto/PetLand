import {Entity, model, property} from '@loopback/repository';

@model()
export class Sucursales extends Entity {
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
  Departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  Ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;


  constructor(data?: Partial<Sucursales>) {
    super(data);
  }
}

export interface SucursalesRelations {
  // describe navigational properties here
}

export type SucursalesWithRelations = Sucursales & SucursalesRelations;
