exports.yell = function (msg) {
  return msg.toUpperCase();
};

exports.activeClass = function(path) {
  if (path === '/') {
    if (path === this.url) {
      return 'class="active"';
    } else {
      return '';
    }
  }
  else {
    return (this.url.indexOf(path) === 0 ? 'class="active"' : '');
  }
};