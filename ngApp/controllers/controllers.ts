namespace photoapp.Controllers {

    export class HomeController {
        public pictures;
        public picture = {};
        public validationErrors;

        public save() { 
          this.pictureService.save(this.picture).then(()=> {
            this.pictures = this.pictureService.list(); //redisplay list
            this.picture = {}; //clear form
            this.validationErrors = null; //clear validation
          }).catch((err) => {
            console.error(err);
            this.validationErrors = err.data.errors;
          })
        }

        public remove(pictureId) {
            // alert('work please');
          this.pictureService.remove(pictureId).then(() => {
            this.pictures = this.pictureService.list(); //redisplay list
          }).catch((err) => {
            console.error(err);
          });
        }

        constructor(private pictureService:photoapp.Services.PictureService) {
          this.pictures = this.pictureService.list();
        }
    }

    export class EditController {
      public picture;
      // public validationErrors;

      public save() {
        this.pictureService.save(this.picture).then(() => {
          alert('work');
          this.$state.go('home'); //navigate back home
        }).catch((err) => {
          console.error(err);
          // this.validationErrors = err.data.errors;
        })
      }

      constructor(
        private pictureService:photoapp.Services.PictureService,
        private $state: ng.ui.IStateService,
        private $stateParams: ng.ui.IStateParamsService
      ) {
        let pictureId = $stateParams['id'];
        this.picture = this.pictureService.get(pictureId);
      }
    }

export class AboutController {
  public message = 'Hello from the about page!';

  public file;

    public pickFile(){
      this.filepickerService.pick(
        {mimetype: 'image/*' },
        this.fileUploaded.bind(this)
      );
    }

    public fileUploaded(file) {
      //save file url to database
      this.file = file;
      console.log(this.file); //display object within console
      this.$scope.$apply(); //force page to update
    }
    constructor (private filepickerService, private $scope: ng.IScope) { }

  }
 angular.module('photoapp').controller('aboutController', AboutController);
}
