import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Mascotas, Pedidos} from '../models';
import {MascotasRepository} from './mascotas.repository';
import {PedidosRepository} from './pedidos.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.Id,
  UsuariosRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascotas, typeof Usuarios.prototype.Id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedidos, typeof Usuarios.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotasRepository') protected mascotasRepositoryGetter: Getter<MascotasRepository>, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Usuarios, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidosRepositoryGetter,);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotasRepositoryGetter,);
  }
}
