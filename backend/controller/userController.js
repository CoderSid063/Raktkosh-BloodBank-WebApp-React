const User = require("../model/Users")

exports.register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            gender,
            dateOfBirth,
            address,
            nationality,
            avatar,
        } = req.body;


        const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        const phoneRegex = /^[0-9]{10}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ message: 'Invalid phone number format. Phone number should have 10 digits' });
        }

        const existingUseremail = await User.findOne({
            $or: [
                { email: email },
            ]
        });
        if (existingUseremail) {
            return res.status(400).json({ message: 'User with given emailID already exists' });
        }

        const existingUserphonenumber = await User.findOne({
            $or: [
                { phoneNumber: phoneNumber }
            ]
        });
        if (existingUserphonenumber) {
            return res.status(400).json({ message: 'User with given phone number already exists' });
        }

        const users = await User.create({ firstName, lastName, email, phoneNumber, password, gender, dateOfBirth, address, nationality, avatar, })
        return res.status(201).json({
            success: true,
            data: users,
            message: "User register successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User can not register"
        });
    }
};