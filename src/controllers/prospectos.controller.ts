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
import {Prospectos} from '../models';
import {ProspectosRepository} from '../repositories';

export class ProspectosController {
  constructor(
    @repository(ProspectosRepository)
    public prospectosRepository : ProspectosRepository,
  ) {}

  @post('/prospectos')
  @response(200, {
    description: 'Prospectos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Prospectos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prospectos, {
            title: 'NewProspectos',
            exclude: ['Id'],
          }),
        },
      },
    })
    prospectos: Omit<Prospectos, 'Id'>,
  ): Promise<Prospectos> {
    return this.prospectosRepository.create(prospectos);
  }

  @get('/prospectos/count')
  @response(200, {
    description: 'Prospectos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Prospectos) where?: Where<Prospectos>,
  ): Promise<Count> {
    return this.prospectosRepository.count(where);
  }

  @get('/prospectos')
  @response(200, {
    description: 'Array of Prospectos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Prospectos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Prospectos) filter?: Filter<Prospectos>,
  ): Promise<Prospectos[]> {
    return this.prospectosRepository.find(filter);
  }

  @patch('/prospectos')
  @response(200, {
    description: 'Prospectos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prospectos, {partial: true}),
        },
      },
    })
    prospectos: Prospectos,
    @param.where(Prospectos) where?: Where<Prospectos>,
  ): Promise<Count> {
    return this.prospectosRepository.updateAll(prospectos, where);
  }

  @get('/prospectos/{id}')
  @response(200, {
    description: 'Prospectos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Prospectos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prospectos, {exclude: 'where'}) filter?: FilterExcludingWhere<Prospectos>
  ): Promise<Prospectos> {
    return this.prospectosRepository.findById(id, filter);
  }

  @patch('/prospectos/{id}')
  @response(204, {
    description: 'Prospectos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prospectos, {partial: true}),
        },
      },
    })
    prospectos: Prospectos,
  ): Promise<void> {
    await this.prospectosRepository.updateById(id, prospectos);
  }

  @put('/prospectos/{id}')
  @response(204, {
    description: 'Prospectos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() prospectos: Prospectos,
  ): Promise<void> {
    await this.prospectosRepository.replaceById(id, prospectos);
  }

  @del('/prospectos/{id}')
  @response(204, {
    description: 'Prospectos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.prospectosRepository.deleteById(id);
  }
}
