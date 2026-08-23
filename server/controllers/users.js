const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createAccessToken, errorHandler } = require("../middleware/auth");

module.exports.registerUser = (req, res) => {
	const { firstName, lastName, email, mobileNo, password } = req.body;

	if (!email || !email.includes("@")) {
		return res.status(400).send({ message: "Email Invalid" });
	}

	if (!password || password.length < 8) {
		return res.status(400).send({ message: "Password must be at least 8 characters" });
	}

	if (!mobileNo || mobileNo.length !== 11) {
		return res.status(400).send({ message: "Mobile number is Invalid" });
	}

	User.findOne({ email })
		.then(existingUser => {
			if (existingUser) {
				return res.status(409).send({ message: "Duplicate email found" });
			}

			const newUser = new User({
				firstName,
				lastName,
				email,
				mobileNo,
				password: bcrypt.hashSync(password, 10),
			});

			return newUser
				.save()
				.then(() => res.status(201).send({ message: "Registered Successfully" }))
				.catch(err => res.status(500).send({ error: err.message }));
		})
		.catch(err => res.status(500).send({ error: err.message }));
};

module.exports.loginUser = (req, res) => {
	const { loginId, password } = req.body;

	if (!loginId || !password) {
		return res.status(400).send({ message: "Email/Username and password are required"});
	}

	const isEmail = loginId.includes("@");

	User.findOne(
		isEmail ? { email: loginId } : { username: loginId }
	) .then(user => {
		if (!user) {
			return res.status(404).send({ message: "No account found" });
		}

		const isPasswordCorrect = bycrpt.compareSync(password, user.password);

		if (isPasswordCorrect) {
			return res.status(200).send({ access: createAccessToken(user) });
		} else {
			return res.status(401).send({ message: "Incorrect password" });
		}
	})
	.catch(err => res.status(500).send({ error: err.message }));
};

module.exports.getProfile = (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      user.password = undefined;
      return res.status(200).send({ user });
    })
    .catch(err => res.status(500).send({ error: err.message }));
};

module.exports.updateUserAdmin = (req, res) => {
  const userId = req.params.id;

  return User.findById(userId)
  .then(user => {
    if (!user) {
    return res.status(404).send({
      message: "User not found"
    });
  }

    user.isAdmin = true;
  
    return user.save()
    .then(updatedUser => {
      return res.status(200).send({updatedUser});
    })
    .catch(error => errorHandler(error, req, res));
  })
  .catch(error => errorHandler(error, req, res));
};

module.exports.updatePassword = (req, res) => {
  const userId = req.user.id;
  const { newPassword } = req.body;

  return User.findById(userId)
  .then(user => {
    if (!user) {
      return res.status(404).send({
        message: "Password not updated"
      });
    }

    user.password = bcrypt.hashSync(newPassword, 10);

    return user.save()
      .then(() => {
        return res.status(200).send({
          message: "Password changed successfully"
        });
      });
  })
  .catch(error => errorHandler(error, req, res));
};

/*module.exports.changePassword = (req, res) => {
	const userId = req.user.id;
	const { newPassword } = req.body;

	if (!newPassword || newPassword.length < 8) {
		return res.status(400).send({ message: "Password must be at least 8 characters" });
	}

	return User.findById(userId)
		.then(user => {
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}

			user.password = bcrypt.hashSync(newPassword, 10);

			return user
				.save()
				.then(() => res.status(200).send({ message: "Password changed successfully" }))
				.catch(error => errorHandler(error, req, res));
		})
		.catch(error => errorHandler(error, req, res));
};
*/