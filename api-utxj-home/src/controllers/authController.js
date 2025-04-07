import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv'

dotenv.config();



export const register = async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", req.body); // Verifica los datos

    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword
    });

    await newUser.save();
    return res.status(201).json({ msg: "Usuario registrado correctamente" });

  } catch (err) {
    console.error("Error en registro:", err.message);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};



// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//   //console.log("Login request received with email:", email, "and password:", password);//DULCE, ESTA DOBLE

//   if (!email || !password) {
//     return res.status(400).json({ msg: 'Please provide email and password' });
//   }

  
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }
//     if (typeof password !== "string") {
//       console.error("Password is not a valid string:", password);
//       return res.status(400).json({ msg: "Invalid password format" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("Login request received with email:", email, "and password:", password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error("Error in login:", err.message);
//     res.status(500).send('Server error');
//   }
// };
// En authController.js
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
      console.log("error")
    }
    console.log("AQUII")
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: { id: user.id }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token }); // Enviar el token como respuesta
      console.log("AQUII")
      
    });
    
  } catch (err) {
    console.error("Error en login:", err.message);
    res.status(500).send('Server error');
  }
};

// Middleware de autenticación
export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Acceso denegado" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token inválido" });
      req.user = user;
      next();
  });
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: 'ID no proporcionado' });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.status(200).json({ msg: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error(`Error en deleteUserById: ${err.message}`);
    res.status(500).json({ msg: `Error al eliminar el usuario: ${err.message}` });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  console.log("Update request received for user ID:", id);

  if (!id) {
    return res.status(400).json({ msg: 'ID no proporcionado' });
  }

  // Crear un objeto con los datos a actualizar
  const updateData = {};
  if (email) updateData.email = email;
  if (password) {
    // Si se proporciona una nueva contraseña, hacer hash de ella
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  try {
    // Encontrar y actualizar el usuario en la base de datos
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.status(200).json({ msg: 'Usuario actualizado correctamente', user });
  } catch (err) {
    console.error(`Error en updateUserById: ${err.message}`);
    res.status(500).json({ msg: `Error al actualizar el usuario: ${err.message}` });
  }
};