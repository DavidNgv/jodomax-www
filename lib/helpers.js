exports.yell = function (msg) {
  return msg.toUpperCase();
};

exports.activeClass = function(path) {
  return (this.url.indexOf(path) === 0 ? 'class="active"' : '');
};