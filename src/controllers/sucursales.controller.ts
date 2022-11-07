import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Sucursales} from '../models';
import {SucursalesRepository} from '../repositories';

export class SucursalesController {
  constructor(
    @repository(SucursalesRepository)
    public sucursalesRepository : SucursalesRepository,
  ) {}

  @post('/sucursales')
  @response(200, {
    description: 'Sucursales model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sucursales)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursales, {
            title: 'NewSucursales',
            exclude: ['Id'],
          }),
        },
      },
    })
    sucursales: Omit<Sucursales, 'Id'>,
  ): Promise<Sucursales> {
    return this.sucursalesRepository.create(sucursales);
  }

  @get('/sucursales/count')
  @response(200, {
    description: 'Sucursales model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sucursales) where?: Where<Sucursales>,
  ): Promise<Count> {
    return this.sucursalesRepository.count(where);
  }

  @get('/sucursales')
  @response(200, {
    description: 'Array of Sucursales model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sucursales, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sucursales) filter?: Filter<Sucursales>,
  ): Promise<Sucursales[]> {
    return this.sucursalesRepository.find(filter);
  }

  @patch('/sucursales')
  @response(200, {
    description: 'Sucursales PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursales, {partial: true}),
        },
      },
    })
    sucursales: Sucursales,
    @param.where(Sucursales) where?: Where<Sucursales>,
  ): Promise<Count> {
    return this.sucursalesRepository.updateAll(sucursales, where);
  }

  @get('/sucursales/{id}')
  @response(200, {
    description: 'Sucursales model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sucursales, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sucursales, {exclude: 'where'}) filter?: FilterExcludingWhere<Sucursales>
  ): Promise<Sucursales> {
    return this.sucursalesRepository.findById(id, filter);
  }

  @patch('/sucursales/{id}')
  @response(204, {
    description: 'Sucursales PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursales, {partial: true}),
        },
      },
    })
    sucursales: Sucursales,
  ): Promise<void> {
    await this.sucursalesRepository.updateById(id, sucursales);
  }

  @put('/sucursales/{id}')
  @response(204, {
    description: 'Sucursales PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sucursales: Sucursales,
  ): Promise<void> {
    await this.sucursalesRepository.replaceById(id, sucursales);
  }

  @del('/sucursales/{id}')
  @response(204, {
    description: 'Sucursales DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sucursalesRepository.deleteById(id);
  }
}
