const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    // port: 5432,
    user: "postgres",
    password: "postgres",
    database: "likeme",
    allowExitOnIdle: true
    });


const obtenerPosts = async () => {
    try {
        const {rows} = await pool.query("SELECT * FROM posts ORDER BY id");
        return rows;
    } catch  (e) {
        console.log("Error al ingresar datos ", e)
    }
};

const agregarPosts = async (titulo,img,descripcion,likes) => {
    try{
        const consulta = "INSERT INTO posts VALUES (DEFAULT,$1, $2, $3, $4)";
        const parametros = [ titulo, img, descripcion,likes]; 
        const datos = await pool.query(consulta, parametros);
        return datos;
    }catch (e){
        console.error("Error al agregar datos:", e);
    throw e;

    }
};

module.exports = { obtenerPosts, agregarPosts }
