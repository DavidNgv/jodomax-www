exports.yell = function (msg) {
  return msg.toUpperCase();
};

exports.activeClass = function(path) {
  return (this.url === path ? 'class="active"' : '');
};