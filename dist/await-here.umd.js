(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['await-here'] = {})));
}(this, (function (exports) { 'use strict';

  const here = (promise) => promise
      .then(data => [null, data])
      .catch(err => [err, undefined]);

  exports.here = here;
  exports.default = here;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
