import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedidos,
  Usuarios,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosUsuariosController {
  constructor(
    @repository(PedidosRepository)
    public pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Pedidos.prototype.Id,
  ): Promise<Usuarios> {
    return this.pedidosRepository.usuarios(id);
  }
}
