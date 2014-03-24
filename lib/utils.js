

/*
 * Sorts an object's attributes based on attributes' order from reference object
 * and removes the attributes that are not present in the reference object;
 *
 * @param {Object} object
 */
var formatObject = function(object, reference){
  var formatted = {};
  Object.keys(reference).forEach(function(key){
    if ( object.hasOwnProperty(key) ) {
      if ( object[key] instanceof Object ) {
        formatted[key] = formatObject(object[key], reference[key]);
      } else {
        formatted[key] = object[key];
      }
    }
  });
  return formatted;
}

exports.formatObject = formatObject;
