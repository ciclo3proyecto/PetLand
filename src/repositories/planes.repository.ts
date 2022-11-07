import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Planes, PlanesRelations} from '../models';

export class PlanesRepository extends DefaultCrudRepository<
  Planes,
  typeof Planes.prototype.Id,
  PlanesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Planes, dataSource);
  }
}
