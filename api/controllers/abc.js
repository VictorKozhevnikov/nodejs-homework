function hello(req, res) {
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);
  res.json({ message: hello });
}

module.exports = {
  hello: hello
};
