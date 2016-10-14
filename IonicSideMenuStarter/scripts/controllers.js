angular.module('angularApp.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.matricula = "0100000505";
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams, $http) {


    $scope.playListTitle = $stateParams.playlistId;

})

.controller('PontoCtrl', function ($scope, $stateParams,$http) {

  
   $scope.matricula = $stateParams.matricula;
 
    $http({
        method: 'GET',
        url: 'http://homologacao/apis/ponto/api/registrosDePonto/' + $scope.matricula
    }).then(function successCallback(response) {
        success(response);
    }, function errorCallback(response) {
        err(response);
    });



    function success(response) {

        $scope.batidas = response;
    }


    function err(response) {
        alert("Erro:" +response.textStatus);
    }



 $scope.RegistraPonto = function () {

         post = {
            filial:"00",
            matricula:"000505",
            centroCusto: "CP20154",
            dataHora: new Date().toISOString(),
            modelo:"W",
            ip: "172.31.25.58"
        }

        
        $.ajax({
            type: "POST",
            url: 'http://homologacao/apis/ponto/api/RegistrarPonto/',
            data: post
           
        }).done(function (data, textStatus, jqXHR) {

            
            alert(jqXHR.responseText);
          


        }).fail(function (jqXHR, textStatus, errorThrown) {

            alert(jqXHR.responseText);

           

        }).always(function () {

            document.location.reload(true);
        });

   

    }

});