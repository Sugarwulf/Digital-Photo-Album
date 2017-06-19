namespace photoapp.Services {

export class PictureService {
  private PictureResource;

  public get(id) {
    return this.PictureResource.get({id:id});
  }

  public list() {
    return this.PictureResource.query();
  }

  public save(picture) {
    return this.PictureResource.save({id:picture._id}, picture).$promise;
  }

  public remove(pictureId) {
    return this.PictureResource.remove({id:pictureId}).$promise;
  }

  constructor($resource:ng.resource.IResourceService) {
    this.PictureResource = $resource('/api/picture/:id');
  }
}

angular.module('photoapp').service('pictureService', PictureService);

}
