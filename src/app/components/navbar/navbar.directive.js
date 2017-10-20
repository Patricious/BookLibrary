(function() {
  'use strict';

  angular
    .module('bookLibrary')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $mdDialog) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
      vm.cancel = function() {
        $mdDialog.cancel();
      };
      vm.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: "MainController",
          controllerAs:"vm",
          templateUrl: 'app/main/bookAdd.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
          .then(function(answer) {
            vm.status = 'You said the information was "' + answer + '".';
            console.log(answer)
          }, function() {
            $mdDialog.cancel();
            vm.status = 'You cancelled the dialog.';
          });
      };
    }
  }

})();
