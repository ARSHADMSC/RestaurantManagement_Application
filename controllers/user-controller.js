import { User, validateUser } from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { nanoid } from 'nanoid'
import dotenv from 'dotenv'

dotenv.config()
const register = async (req, res) => {
    const { name, email, password } = req.body
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({ email })
    if (user) {
        return res.status(400).send('User already registered')
    } else {
        try {
            let HashedPassword = await bcrypt.hash(password, 10)
            let newUser = new User({
                name,
                email,
                password: HashedPassword,
            })
            let result = await newUser.save()
            res.status(201).send(result)
        } catch (error) {
            return res.status(400).send(error)
        }

    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).send('Invalid email or password')
    } else {
        try {
            let isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).send('Invalid email or password')
            } else {
                let token = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, { expiresIn: '1h' })
                res.status(200).send(token)
            }
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

const sendEmail = async (req, res) => {
    const { email } = req.body
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).send('Invalid email')
    } else {
        try {
            // gelerate code
            const otpCode = nanoid(5).toUpperCase()
            // save to db
            user.otpCode = otpCode
            await user.save()

            // send email by using nodemailer

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                // port: 993,
                secure: false,
                auth: {
                    // type:"login",
                    user: "parvansajeevan666@gmail.com",
                    pass: "ksjwpghjpcqjvmwq"
                }

            });

            const mailOption = {
                from: "parvansajeevan666@gmail.com",
                to: email,
                subject: "Password Reset mail ⚒️",
                text: `Your OTP is : ${otpCode}`,
                // html: "Hello worlds"
            }
            transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(info)
                }
            });

            res.status(200).send('Email sent')
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

const verifyCode = async (req, res) => {
    const { email, otpCode } = req.body
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).send('Invalid email')
    } else {
        try {
            if (user.otpCode === otpCode) {
                res.status(200).send('Code verified')
            } else {
                res.status(400).send('Invalid code')
            }
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

const resetPassword = async (req, res) => {
    const { email, password, confirmpassword } = req.body
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).send('Invalid email')
    }
    if (password !== confirmpassword) {
        return res.status(400).send('Password does not match')
    }
    try {
        let HashedPassword = await bcrypt.hash(password, 10)
        user.password = HashedPassword
        await user.save()
        res.status(200).send('Password reset successful')
    } catch (error) {
        return res.status(400).send(error)
    }

}

const getallUsers = async (req, res) => {
    try {
        let users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        return res.status(400).send(error)
    }
}   


export default{ 
    register,
    login,
    sendEmail,
    verifyCode,
    resetPassword,
    getallUsers,
}
