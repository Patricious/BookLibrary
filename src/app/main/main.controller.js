(function() {
  'use strict';

  angular
    .module('bookLibrary')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr,$http,$mdDialog,localStorageService) {
    var vm = this;

    // vm.Books = [
    //   {
    //     "ISBN": "EBEF",
    //     "Format": "pdf",
    //     "Title": "times for code 3",
    //     "Subtitle": "coding life advanced 2",
    //     "Description": "when a developer lives coding 3",
    //     "Contributors": "thulani,patricia",
    //     "Language": "english",
    //     "PublicationDate": "2017-08-25T00:00:00"
    //   },
    //   {
    //     "ISBN": "EBF",
    //     "Format": "pdf",
    //     "Title": "times for code 2",
    //     "Subtitle": "coding life advanced",
    //     "Description": "when a developer lives coding 2",
    //     "Contributors": "thulani,patricia",
    //     "Language": "english",
    //     "PublicationDate": "2017-08-25T00:00:00"
    //   },
    //   {
    //     "ISBN": "EBG",
    //     "Format": "pdf",
    //     "Title": "times for code",
    //     "Subtitle": "coding life",
    //     "Description": "when a developer lives coding",
    //     "Contributors": "thulani",
    //     "Language": "english",
    //     "PublicationDate": "2017-08-25T00:00:00"
    //   }
    // ];
    vm.Books = [];
    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1505888837633;
    vm.book =getbook();
    vm.isbn = "";
    vm.bookEdit = {};
    function getbook() {
      return localStorageService.get('book');
    }
    vm.data = {
      columns: [
        {
          title: 'ISBN',
          field: 'ISBN',
          sortable: true
        }
        , {
          title: 'Format',
          field: 'Format',
          sortable: true
        },
        {
          title: 'Title',
          field: 'Title',
          sortable: true
        },
        {
          title: 'Subtitle',
          field: 'Subtitle',
          sortable: true
        },
        {
          title: 'Description',
          field: 'Description',
          sortable: true
        }, {
          title: 'Contributors',
          field: 'Contributors',
          sortable: true
        }
        , {
          title: 'Language',
          field: 'Language',
          sortable: true
        }, {
          title: 'Publication Date',
          field: 'PublicationDate',
          sortable: true
        }
      ],

      contents: [],
      query: {
        order: 'name',
        limit: 5,
        page: 1
      },
      count: 0,
      promise: null
    };
    vm.showToastr = showToastr;
    vm.showAdvanced = function(ev, book) {
      vm.book = book;
      localStorageService.set('book',book);
      getbook();
      $mdDialog.show({
        controller: "MainController",
        controllerAs:"vm",
        Book:book,
        templateUrl: 'app/main/edit/bookEdit.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals:book,
        resolve: {
          Book: function () {
            return book;
          }
        }
      })
        .then(function(answer) {
          vm.status = 'You said the information was "' + answer + '".';
          console.log(answer)
        }, function() {
          vm.book = {};
          $mdDialog.cancel();
          vm.status = 'You cancelled the dialog.';
        });
    };
    activate();

    function activate() {
      getWebDevTec();
      $timeout(function () {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr(message) {
      toastr.info(message);
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function (awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.filterByDetails = function () {
      console.log('kkkkkkkkkk')
      // $http({
      //     method : "GET",
      //     url : "http://localhost:50717/api/Book/GetAll"
      // }).then(function mySuccess(response) {
      //     console.log('susu',response)
      // }, function myError(response) {
      //     console.log('fifififfi',response)
      // });
      $http({
        method: "GET",
        url: "http://localhost:50717/api/Book/GetAll"
      }).success(function (response) {
        if (response.code == '00') {
          vm.Books = response.data;
        }
      });
    }
    vm.filterByISBN = function () {
      $http({
        method: "GET",
        url: "http://localhost:50717/api/Book/Get?ISBN=" + vm.isbn
      }).success(function (response) {
        if (response.code == '00') {
          vm.Books = response.data;
        }
      });
    }
    vm.deleteBook = function (book) {
      $http({
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        method: "DELETE",
        url: "http://localhost:50717/api/Book/Delete",
        data: book
      }).success(function (response) {
        if (response.code == '00') {
          showToastr("Book deleted successfully");
        }else{
          showToastr("Book not deleted");
        }
      });
    }
    vm.EditBook = function () {
      $http({
        method: "PUT",
        url: "http://localhost:50717/api/Book/Put",
        data: vm.book
      }).success(function (response) {
        if (response.code == '00') {
          vm.Books = response.data;
        }
      });
    }
    vm.AddBook = function () {
      console.log(vm.book)
      var res = $http({
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        method: "POST",
        url: "http://localhost:50717/api/Book/Post",
        data: vm.book
      });
      console.log(res);
      res.success(function (response) {
        if (response.code == '00') {
          vm.Books = response.data;
        }
      });
    }
  }
})();
