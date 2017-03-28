import app from './app'
app.config( ($routeProvider, $locationProvider) => {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
      templateUrl: '/app/views/home/index.html'
    })

  }
)
