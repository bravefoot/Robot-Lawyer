/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.dashboard=function(req,res) {
	res.render('dashboard',{
		title:'dashboard'
	})
}