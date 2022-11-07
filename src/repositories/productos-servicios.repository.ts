import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductosServicios, ProductosServiciosRelations} from '../models';

export class ProductosServiciosRepository extends DefaultCrudRepository<
  ProductosServicios,
  typeof ProductosServicios.prototype.Id,
  ProductosServiciosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProductosServicios, dataSource);
  }
}
