import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascotas,
  Planes,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasPlanesController {
  constructor(
    @repository(MascotasRepository)
    public mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/planes', {
    responses: {
      '200': {
        description: 'Planes belonging to Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Planes)},
          },
        },
      },
    },
  })
  async getPlanes(
    @param.path.string('id') id: typeof Mascotas.prototype.Id,
  ): Promise<Planes> {
    return this.mascotasRepository.planes(id);
  }
}
