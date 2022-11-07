import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sucursales, SucursalesRelations} from '../models';

export class SucursalesRepository extends DefaultCrudRepository<
  Sucursales,
  typeof Sucursales.prototype.Id,
  SucursalesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Sucursales, dataSource);
  }
}
