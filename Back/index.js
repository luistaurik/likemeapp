const express = require("express");
const app = express();
const cors = require("cors");
const { obtenerPosts, agregarPosts, darLike, deletePost } = require("./operaciones");

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Servidor ok");
});

app.get("/posts" , async (req, res) =>{
  try{
    const post = await obtenerPosts();
    res.send(post);
  } catch (e){ 
    res.status(500).json({e: "error al leer datos"})

  }
});

app.post("/posts" , async (req, res) =>{
  try{
      const {titulo,url,descripcion,likes} = req.body;
      await agregarPosts(titulo,url,descripcion,likes);
      res.status(201).json({
        message: "Post agregado correctamente.",
        post: { titulo, url, descripcion, likes },
      });
  } catch (e){
    res.status(500).json({ error: "Error al agregar el post." });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try{
    const {id} = req.params;
    await darLike(id);
    res.status(200).json({message:"El like se ha hecho"}); 
  }
  catch (e) {
    console.error("error encontrado al modificar el post:",e)
    res.status(500).json({error:"error encontrado al modificar el post"})
  }
  
})

app.delete("/posts/:id", async (req, res) => {
    try{
      const {id} = req.params;
      await deletePost(id);
      res.status(200).json({message:"El post esta eliminado"}); 
    }
    catch (e) {
      console.error("error no se pudo eliminar el post:",e)
      res.status(500).json({error:"error al eliminar"})
    }
  }
)