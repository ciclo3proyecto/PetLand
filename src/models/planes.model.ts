import {Entity, model, property} from '@loopback/repository';

@model()
export class Planes extends Entity {
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
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;


  constructor(data?: Partial<Planes>) {
    super(data);
  }
}

export interface PlanesRelations {
  // describe navigational properties here
}

export type PlanesWithRelations = Planes & PlanesRelations;
