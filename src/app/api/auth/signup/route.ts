import { NextResponse } from "next/server";
import User from "@/models/user"
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    const { fullname, email, password } = await request.json()
    console.log(fullname, email, password)

    //Validacion de datos
    if (!password || password.lenght < 6) return NextResponse.json({
        message: "Password must be at least 6 characters"
    }, {
        status: 400
    })

    try {
        //Conexion a base de datos
        await connectDB()
        //Verificaion de existencia de usuarios
        const userFound = await User.findOne({ email })

        if (userFound) return NextResponse.json({
            message: "Email already in use"
        }, {
            status: 409
        })

        //Encriptacion de contraseña
        const hashedPassword = await bcrypt.hash(password, 12)

        //Creacion de nuevos usuarios con la la informacion recibida
        const user = new User({
            email,
            fullname,
            password: hashedPassword
        })
        const savedUser = await user.save()
        console.log(savedUser)

        //Retorno de usuarios al cliente
        return NextResponse.json(savedUser)
    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }
}