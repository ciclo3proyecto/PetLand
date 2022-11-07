import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {Planes} from './planes.model';

@model()
export class Mascotas extends Entity {
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
  })
  Edad?: number;

  @property({
    type: 'string',
  })
  Especie?: string;

  @property({
    type: 'string',
  })
  Foto?: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'string',
  })
  Comentario?: string;

  @belongsTo(() => Usuarios)
  usuariosId: string;

  @belongsTo(() => Planes)
  planesId: string;

  constructor(data?: Partial<Mascotas>) {
    super(data);
  }
}

export interface MascotasRelations {
  // describe navigational properties here
}

export type MascotasWithRelations = Mascotas & MascotasRelations;
