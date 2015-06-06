/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    var username = req.param('username');
    return res.json({
      name: username
    });
    // return res.view('first_time_login');
  },


  /**
   * `UserController.signin()`
   */
  signin: function (req, res) {
    return res.json({
      todo: 'signin() is not implemented yet!'
    });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    return res.json({
      todo: 'logout() is not implemented yet!'
    });
  }
};

