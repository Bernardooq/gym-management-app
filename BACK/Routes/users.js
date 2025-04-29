const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const {addProgress,buscarUsuariosPorName, agregarUsuario, buscarUsuarioPorFile, eliminarUsuarioPorFile, modificarUsuarioPorFile, getAllUsers, buscarUsuarioPorEmailAndPassword, addRoutine } = require('../Controllers/User');

router.post('/add', async (req, res) => {
    try {
        const newUser = req.body;
        const usuarioAgregado = await agregarUsuario(newUser);
        res.json(usuarioAgregado);
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).json({ error: 'Error al agregar usuario' });
    }
});

router.get('/find/:userFile', async (req, res) => {
    try {
        const userFile = req.params.userFile;
        const usuarioEncontrado = await buscarUsuarioPorFile(userFile);
        res.json(usuarioEncontrado);
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).json({ error: 'Error al buscar usuario' });
    }
});

router.get('/name/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const usuariosEncontrados = await buscarUsuariosPorName(name);
        res.json(usuariosEncontrados);
    } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ error: 'Error al buscar usuarios' });
    }
});

router.delete('/delete/:userFile', async (req, res) => {
    try {
        const userFile = req.params.userFile;
        const usuarioEliminado = await eliminarUsuarioPorFile(userFile);
        res.json(usuarioEliminado);
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
});

router.put('/update/:userFile', async (req, res) => {
    try {
        const userFile = req.params.userFile;
        const newAttributes = req.body;
        const usuarioModificado = await modificarUsuarioPorFile(userFile, newAttributes);
        res.json(usuarioModificado);
    } catch (error) {
        console.error('Error al modificar usuario:', error);
        res.status(500).json({ error: 'Error al modificar usuario' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const usuarios = await getAllUsers();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener todos los usuarios' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = req.body;
        const usuario = await buscarUsuarioPorEmailAndPassword(user.email, user.password);
        if (!usuario) {
            res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        else {
        res.json(usuario); 
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión, email no encontrado' });
    }
});

// Generar y devolver un token JWT después de autenticar al usuario
router.post('/loginJWT', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await buscarUsuarioPorEmailAndPassword(email, password);
        
        if (usuario) {
            const token = jwt.sign({ email: usuario.email }, 'sudosu', { expiresIn: '1h' });
            res.json({ token: token });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Verificar si el token JWT es válido
router.post('/verifyJWT', (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Token no enviado' });
        }

        jwt.verify(token, 'sudosu', (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token inválido' });
            }
            res.json({ message: 'Token válido' });
        });
    } catch (error) {
        console.error('Error al verificar token:', error);
        res.status(500).json({ error: 'Error al verificar token' });
    }
});

router.post('/addroutine/:file', async (req, res) => {
    try {
        const file = req.params.file;
        const routine = req.body;
        const rutinaAgregada = await addRoutine(file, routine);
        res.json(rutinaAgregada);
    } catch (error) {
        console.error('Error al agregar rutina:', error);
        res.status(500).json({ error: 'Error al agregar rutina' });
    }
});

    
router.put('/addprogress/:file', async (req, res) => {
    try {
        const file = req.params.file;
        const progress = req.body;
        const progresoAgregado = await addProgress(file, progress);
        res.json(progresoAgregado);
    } catch (error) {
        console.error('Error al agregar progreso:', error);
        res.status(500).json({ error: 'Error al agregar progreso' });
    }
});


module.exports = router;

