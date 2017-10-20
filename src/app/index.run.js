(function() {
  'use strict';

  angular
    .module('bookLibrary')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
