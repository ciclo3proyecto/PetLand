import {Entity, model, property} from '@loopback/repository';

@model()
export class Prospectos extends Entity {
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
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'number',
    required: true,
  })
  Cedula: number;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Comentario: string;


  constructor(data?: Partial<Prospectos>) {
    super(data);
  }
}

export interface ProspectosRelations {
  // describe navigational properties here
}

export type ProspectosWithRelations = Prospectos & ProspectosRelations;
