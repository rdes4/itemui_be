import Users from "../models/UserModel.js";


export const getUsers = async (req,res) => {
    try {
        const response = await Users.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const Register = async(req,res) => {
    const {name, email, password, confPassword} = req.body;
    if (password !== confPassword) {
        return res.status(400).json({
            msg: "Password dan Confirm Password tidak sesuai"
        });
    }

    try {
        await Users.create({
            name: name,
            email: email,
            password: password
        });
        res.json({
            msg: 'Register berhasil'
        })
    } catch (error) {
        console.log(error.message);
    }
}