import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascotas, MascotasRelations, Usuarios, Planes} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {PlanesRepository} from './planes.repository';

export class MascotasRepository extends DefaultCrudRepository<
  Mascotas,
  typeof Mascotas.prototype.Id,
  MascotasRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Mascotas.prototype.Id>;

  public readonly planes: BelongsToAccessor<Planes, typeof Mascotas.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>,
  ) {
    super(Mascotas, dataSource);
    this.planes = this.createBelongsToAccessorFor('planes', planesRepositoryGetter,);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
  }
}
