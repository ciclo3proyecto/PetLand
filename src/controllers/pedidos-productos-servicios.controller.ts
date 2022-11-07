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
Pedidos,
DetallePedidos,
ProductosServicios,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosProductosServiciosController {
  constructor(
    @repository(PedidosRepository) protected pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/productos-servicios', {
    responses: {
      '200': {
        description: 'Array of Pedidos has many ProductosServicios through DetallePedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductosServicios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductosServicios>,
  ): Promise<ProductosServicios[]> {
    return this.pedidosRepository.productosServicios(id).find(filter);
  }

  @post('/pedidos/{id}/productos-servicios', {
    responses: {
      '200': {
        description: 'create a ProductosServicios model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductosServicios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedidos.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosServicios, {
            title: 'NewProductosServiciosInPedidos',
            exclude: ['Id'],
          }),
        },
      },
    }) productosServicios: Omit<ProductosServicios, 'Id'>,
  ): Promise<ProductosServicios> {
    return this.pedidosRepository.productosServicios(id).create(productosServicios);
  }

  @patch('/pedidos/{id}/productos-servicios', {
    responses: {
      '200': {
        description: 'Pedidos.ProductosServicios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosServicios, {partial: true}),
        },
      },
    })
    productosServicios: Partial<ProductosServicios>,
    @param.query.object('where', getWhereSchemaFor(ProductosServicios)) where?: Where<ProductosServicios>,
  ): Promise<Count> {
    return this.pedidosRepository.productosServicios(id).patch(productosServicios, where);
  }

  @del('/pedidos/{id}/productos-servicios', {
    responses: {
      '200': {
        description: 'Pedidos.ProductosServicios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductosServicios)) where?: Where<ProductosServicios>,
  ): Promise<Count> {
    return this.pedidosRepository.productosServicios(id).delete(where);
  }
}
