const User = require('../../../backend/models/User.js')
//mail validator
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
//user info validator
const validateUserInfo = ({ name, surname, mail }) => {
    const nameValid = name.trim().length > 0
    const surnameValid = surname.trim().length > 0
    const mailValid = validateEmail(mail)
    return nameValid && surnameValid && mailValid
}

class UserActions {
    // select users
    async selectUsers(req, res) {
        const users = await User.query()
        res.status(200).json(users);
    }

    // create user
    async createUser(req, res) {
        const userData = req.body
        let user

        if (!validateUserInfo(userData)) {
            res.status(422).json({ message: 'user data is not valid' });
        } else {

            try {
                user = await User.query().insert(userData).where('name', '<', 0);;
            } catch (err) {
                return res.status(422).json({ message: err.message });
            }
            res.status(201).json(user);
        }

    }

    // update note
    async updateUser(req, res) {
        const id = req.params.id
        const { name, surname, mail } = req.body

        const userData = {
            id: id,
            name: name,
            surname: surname,
            mail: mail
        }

        let updatedUser;
        if (!validateUserInfo(userData)) {
            res.status(422).json({ message: 'user data is not valid' });
        } else {
            try {
                updatedUser = await User.query()
                    .findById(id)
                    .patch(userData);
            } catch (err) {
                return res.status(422).json({ message: err.message });
            }
            res.status(201).json(userData);
        }

    }

    // delete user
    async deleteUser(req, res) {
        const id = req.params.id
        const numDeleted = await User.query().deleteById(id);
        res.status(204).send('success')
    }

}

module.exports = new UserActions()