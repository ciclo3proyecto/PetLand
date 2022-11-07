import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuarios,
  Pedidos,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosPedidosController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedidos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedidos>,
  ): Promise<Pedidos[]> {
    return this.usuariosRepository.pedidos(id).find(filter);
  }

  @post('/usuarios/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedidos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {
            title: 'NewPedidosInUsuarios',
            exclude: ['Id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) pedidos: Omit<Pedidos, 'Id'>,
  ): Promise<Pedidos> {
    return this.usuariosRepository.pedidos(id).create(pedidos);
  }

  @patch('/usuarios/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Usuarios.Pedidos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {partial: true}),
        },
      },
    })
    pedidos: Partial<Pedidos>,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.usuariosRepository.pedidos(id).patch(pedidos, where);
  }

  @del('/usuarios/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Usuarios.Pedidos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.usuariosRepository.pedidos(id).delete(where);
  }
}
