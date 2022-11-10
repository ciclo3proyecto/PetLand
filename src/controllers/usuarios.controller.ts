import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Credenciales, Usuarios} from '../models';
import {UsuariosRepository} from '../repositories';
import {AutenticacionService} from '../services/autenticacion.service';
const fetch = require('node-fetch');
export class UsuariosController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  @post('/identificarUsuario', {
    responses: {
      '200': {
        description: 'Identificacion de usuarios',
      },
    },
  })
  async identificarUsuario(@requestBody() credenciales: Credenciales) {
    const u = await this.servicioAutenticacion.identificarPersona(
      credenciales.usuario,
      credenciales.clave,
    );
    if (u != null) {
      const token = this.servicioAutenticacion.generarTokenJWT(u);
      return {
        datos: {
          nombre: u.Nombres,
          correo: u.Correo,
          id: u.Id,
        },
        tk: token,
      };
    } else {
      throw new HttpErrors[401]('Datos Invalidos');
    }
  }

  @post('/usuarios')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
            exclude: ['Id'],
          }),
        },
      },
    })
    usuarios: Omit<Usuarios, 'Id'>,
  ): Promise<Usuarios> {
    const contrasena = usuarios.Contrasena;
    usuarios.Contrasena = this.servicioAutenticacion.cifrarClave(
      usuarios.Contrasena,
    );
    const u = await this.usuariosRepository.create(usuarios);

    //Enviar correo al usuario
    const destino = usuarios.Correo;
    const asunto = 'Bienvenido a PetLand';
    const contenido =
      `Hola ${usuarios.Nombres}, estas son sus credenciales para el acceso a la plataforma: Su usuario es ${usuarios.Usuario}` +
      ` y su contraseña es ${contrasena}`;

    fetch(
      `http://127.0.0.1:5000/email?correo_destino=${destino}` +
        `&asunto=${asunto}&contenido=${contenido}`,
    ).then((data: unknown) => {
      console.log(data);
    });
    return u;
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Usuarios) where?: Where<Usuarios>): Promise<Count> {
    return this.usuariosRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.updateAll(usuarios, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuarios, {exclude: 'where'})
    filter?: FilterExcludingWhere<Usuarios>,
  ): Promise<Usuarios> {
    return this.usuariosRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.updateById(id, usuarios);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.replaceById(id, usuarios);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosRepository.deleteById(id);
  }
}
