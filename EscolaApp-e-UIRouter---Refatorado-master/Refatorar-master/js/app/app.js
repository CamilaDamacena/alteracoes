var escolaApp = angular.module("EscolaApp", ["ui.router", 'ngMdIcons']);

//Controllers e Factorys        
var baseUrl = "http://mobile-aceite.tcu.gov.br:80/nossaEscolaRS";

// Factory - API
var escolaApi = function ($http) { //Estrutura básica de um factory

    var _getEscolas = function (quantidadeDeItens) {
        return $http.get(baseUrl + "/rest/escolas?quantidadeDeItens=" + quantidadeDeItens);
    }; //retorna uma função http, base url + endpoints

    var _getPesquisarEscola = function (codEscola) {
        return $http.get(baseUrl + "/rest/escolas/" + codEscola);
    };

    var _getAvaliacoesPorAno = function (codEscola, ano) {
        return $http.get(baseUrl + "/rest/escolas/" + codEscola + "/avaliacoes/ano/" + ano);
    };

    var _getAvaliacoesEscola = function (codEscola) {
        return $http.get(baseUrl + "/rest/escolas/" + codEscola + "/avaliacoes");
    };

    var _getAvaliacoesPorTipo = function (codEscola, tipo) {
        return $http.get(baseUrl + "/rest/escolas/" + codEscola + "/avaliacoes/tipo/" + tipo);
    };

    var _getMediaAvaliacoes = function (codEscola) {
        return $http.get(baseUrl + "/rest/escolas/" + codEscola + "/avaliacoes/media");
    };

    return {
        getEscolas: _getEscolas,
        getPesquisarEscola: _getPesquisarEscola,
        getAvaliacoesPorAno: _getAvaliacoesPorAno,
        getAvaliacoesEscola: _getAvaliacoesEscola,
        getAvaliacoesPorTipo: _getAvaliacoesPorTipo,
        getMediaAvaliacoes: _getMediaAvaliacoes
    };
}

var tipoAvaliacaoEscolaApi = function ($http) {
    var _getTipoAvaliacao = function () {
        return $http.get(baseUrl + "/rest/tiposavaliacao");
    };

    return {
        getTipoAvaliacao: _getTipoAvaliacao
    };

}

// factory responsável por se comunicar com o servidor;
escolaApp.factory("escolaApi", escolaApi);
escolaApp.factory("tipoAvaliacaoEscolaApi", tipoAvaliacaoEscolaApi);

// Controllers pega as informações para listar ---------------------------------------------------------------------------------
var listarEscolaCtrl = function ($scope, escolaApi) {

    $scope.escolas = []; //mudar nos demais controller's;
    $scope.quantidades = [10, 20, 30, 40, 50, 100];

    $scope.listarEscola = function (quantidade) { //Essa função está no button Aqui dentro é o momentoem que pega as informações
        escolaApi.getEscolas(quantidade) //mudar o escolaApi nos demais controller's;
            .then(function (response) { //Garante que a requisão vai e a resposta vem.
                $scope.escolas = response.data;
            })
            .catch(function (error) { //Quando algo der errado.
                console.error(error);
            });
    }
};


//Alteradoo -----------------------------------------------------------//
var pesquisarEscolaCtrl = function ($scope, $stateParams, escolaApi) {

    $scope.escola = {}; //jason
    $scope.codEscola= $stateParams.codEscola;

    $scope.pesquisarEscola = function (codEscola) {
        escolaApi.getPesquisarEscola(codEscola)
            .then(function (response) {
                $scope.escola = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

//-----------------------------------------------------------------------//
var avaliacoesPorAnoCtrl = function ($scope, escolaApi) {

    $scope.avaliacoesPorAno = {}; //jason

    $scope.avaliacoesPorAno = function (codEscola, ano) {
        escolaApi.getAvaliacoesPorAno(codEscola, ano)
            .then(function (response) {
                $scope.avaliacoesPorAno = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

//-------------------------------------------------------------------//
var avaliacoesEscolaCtrl = function ($scope, escolaApi) {

    $scope.avaliacoesEscola = {}; //jason

    $scope.avaliacoesEscola = function (codEscola) {
        escolaApi.getAvaliacoesEscola(codEscola)
            .then(function (response) {
                $scope.avaliacoesEscola = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

var avaliacoesPorTipoCtrl = function ($scope, escolaApi) {

    $scope.avaliacoesPorTipo = {}; //jason

    $scope.avaliacoesPorTipo = function (codEscola, tipo) {
        escolaApi.getAvaliacoesPorTipo(codEscola, tipo)
            .then(function (response) {
                $scope.avaliacoesPorTipo = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

var tipoAvaliacaoCtrl = function ($scope, tipoAvaliacaoEscolaApi) {

    $scope.tipoAvaliacao = [];

    $scope.tipoAvaliacao = function () { //Essa função está no button Aqui dentro é o momentoem que pega as informações
        tipoAvaliacaoEscolaApi.getTipoAvaliacao()
            .then(function (response) { //Garante que a requisão vai e a resposta vem.
                $scope.tipoAvaliacao = response.data;
            })
            .catch(function (error) { //Quando algo der errado.
                console.error(error);
            });
    }
};

var mediaAvaliacoesCtrl = function ($scope, escolaApi) {

    $scope.mediaAvaliacoes = {}; //jason

    $scope.mediaAvaliacoes = function (codEscola) {
        escolaApi.getMediaAvaliacoes(codEscola)
            .then(function (response) {
                $scope.mediaAvaliacoes = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

escolaApp.controller("ListarEscolaCtrl", listarEscolaCtrl);
escolaApp.controller("PesquisarEscolaCtrl", pesquisarEscolaCtrl);
escolaApp.controller("AvaliacoesPorAnoCtrl", avaliacoesPorAnoCtrl);
escolaApp.controller("AvaliacoesEscolaCtrl", avaliacoesEscolaCtrl);
escolaApp.controller("AvaliacoesPorTipoCtrl", avaliacoesPorTipoCtrl);
escolaApp.controller("TipoAvaliacaoCtrl", tipoAvaliacaoCtrl);
escolaApp.controller("MediaAvaliacoesCtrl", mediaAvaliacoesCtrl);


//Configuração das rotas.----------------------------------------------------------------------------//
escolaApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    var homeState = { //Para cada página terá um conjunto desses, faz o mapeamento aqui;
        url: '/home',
        templateUrl: 'home.html'
    };

    var listarEscolaState = { //Para cada página terá um conjunto desses, faz o mapeamento aqui;
        url: '/escolas',
        templateUrl: 'listarEscola.html',
        controller: 'ListarEscolaCtrl'
    };

    var pesquisarEscolaState = {
        url: '/escolas/:codEscola',
        templateUrl: 'pesquisarEscola.html',
        controller: 'PesquisarEscolaCtrl'
    };

    var avaliacoesPorAnoState = {
        url: '/avaliacoesPorAno',
        templateUrl: 'listarAvaliacoesAno.html',
        controller: 'AvaliacoesPorAnoCtrl'
    };

    var avaliacoesEscolaState = {
        url: '/avaliacoesEscola',
        templateUrl: 'listarAvaliacoesEscola.html',
        controller: 'AvaliacoesEscolaCtrl'
    }

    var avaliacoesPorTipoState = {
        url: '/avaliacoesPorTipo',
        templateUrl: 'avaliacoesTipo.html',
        controller: 'AvaliacoesPorTipoCtrl'
    }

    var tipoAvaliacaoState = {
        url: '/tipoAvaliacao',
        templateUrl: 'tiposAvaliacao.html',
        controller: 'TipoAvaliacaoCtrl'
    }

    var mediaAvaliacoesState = {
        url: '/mediaAvaliacoes',
        templateUrl: 'mediaAvaliacao.html',
        controller: 'MediaAvaliacoesCtrl'
    }


    $stateProvider.state('home', homeState);
    $stateProvider.state('listar', listarEscolaState);
    $stateProvider.state('pesquisar', pesquisarEscolaState);
    $stateProvider.state('avaliacoesPorAno', avaliacoesPorAnoState);
    $stateProvider.state('avaliacoesEscola', avaliacoesEscolaState);
    $stateProvider.state('avaliacoesPorTipo', avaliacoesPorTipoState);
    $stateProvider.state('tipoAvaliacao', tipoAvaliacaoState);
    $stateProvider.state('mediaAvaliacoes', mediaAvaliacoesState);
});
