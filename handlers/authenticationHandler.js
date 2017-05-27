module.exports = function() {

    function forgotPassword(req, res) {}

    function changePassword(req, res) {}

    function logout(req, res) {
		req.session.destroy();
		req.logout();
		res.redirect('/#login');
        }

    return {
        forgotPassword: forgotPassword,
        changePassword: changePassword,
        logout:         logout
        }
    };
