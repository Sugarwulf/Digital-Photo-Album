namespace photoapp {

    angular.module('photoapp', ['ui.router', 'ngResource', 'ui.bootstrap', 'angular-filepicker']).config((
        filepickerProvider,
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {filepickerProvider.setKey('AxBCYWSeFT7meyg2dN5UDz');
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: photoapp.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: '/ngApp/views/edit.html',
                controller: photoapp.Controllers.EditController,
                controllerAs: 'controller'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: photoapp.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
