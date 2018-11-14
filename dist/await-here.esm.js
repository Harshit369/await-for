/**
 * Resolves/rejects the promise in one single line
 * @param { Promise } Promise
 * @returns { Promise } Promise that resolves with [ error, data ]
 */
var here = function here(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err, undefined];
  });
};
/**
 * Seperates out provided job from main thread as Promise and resolves in necessary array pattern.
 * @param {Function} jobToPromisify Heavy thread blocking job to seperate out.
 * @param {Function} isCatch A confirmation method to match expectedness of result generated by job.
 * @returns { Promise } here-fied Promise that resolves with [ error, jobResult ]
 */

var job = function job(jobToPromisify, isCatch) {
  for (var _len = arguments.length, additionalJobArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    additionalJobArgs[_key - 2] = arguments[_key];
  }

  return here(new Promise(function (resolve, reject) {
    var result = jobToPromisify.apply(void 0, additionalJobArgs);
    isCatch && isCatch(result) ? reject(result) : resolve(result);
  }));
};
/**
 * @param {Promise} promise Actual promise to transform
 * @param  {Functions} transformations List of transform function to pipe promise result through.
 * @returns { Promise } here-fied Promise that resolves with [ error, resultAfterTransformations ]
 */

var chain = function chain(promise) {
  for (var _len2 = arguments.length, transformations = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    transformations[_key2 - 1] = arguments[_key2];
  }

  var promiseChain = transformations.reduce(function (chain, transformer) {
    return chain.then(function (data) {
      return Promise.resolve(transformer(data));
    });
  }, promise);
  return here(promiseChain);
};

export default here;
export { here, job, chain };