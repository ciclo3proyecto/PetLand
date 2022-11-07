import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedidos, PedidosRelations, Usuarios, ProductosServicios, DetallePedidos} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {DetallePedidosRepository} from './detalle-pedidos.repository';
import {ProductosServiciosRepository} from './productos-servicios.repository';

export class PedidosRepository extends DefaultCrudRepository<
  Pedidos,
  typeof Pedidos.prototype.Id,
  PedidosRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Pedidos.prototype.Id>;

  public readonly productosServicios: HasManyThroughRepositoryFactory<ProductosServicios, typeof ProductosServicios.prototype.Id,
          DetallePedidos,
          typeof Pedidos.prototype.Id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('DetallePedidosRepository') protected detallePedidosRepositoryGetter: Getter<DetallePedidosRepository>, @repository.getter('ProductosServiciosRepository') protected productosServiciosRepositoryGetter: Getter<ProductosServiciosRepository>,
  ) {
    super(Pedidos, dataSource);
    this.productosServicios = this.createHasManyThroughRepositoryFactoryFor('productosServicios', productosServiciosRepositoryGetter, detallePedidosRepositoryGetter,);
    this.registerInclusionResolver('productosServicios', this.productosServicios.inclusionResolver);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
  }
}
