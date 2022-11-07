import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetallePedidos, DetallePedidosRelations} from '../models';

export class DetallePedidosRepository extends DefaultCrudRepository<
  DetallePedidos,
  typeof DetallePedidos.prototype.Id,
  DetallePedidosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(DetallePedidos, dataSource);
  }
}
