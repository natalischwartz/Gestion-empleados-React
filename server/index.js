const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());


//Creamos la conexion a la base de datos 

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"empleados_crud"
});

//Agregar un empleado a la BBDD
app.post('/create', (req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)', [nombre,edad,pais,cargo,anios], (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Empleado registrado con exito")
        }
    })

})

//Obtener empleados de la BBDD
app.get('/empleados', (req,res)=>{
    
    db.query('SELECT * FROM empleados',(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result) // result son todos los datos de la BBDD
        }
    })

})

//Actualizar empleado 

app.put('/update', (req,res)=>{
    const id = req.body.id
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre =? ,edad=?,pais=?,cargo=?,anios=? WHERE id=?', [nombre,edad,pais,cargo,anios,id], (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Empleado actualizado con exito")
        }
    })

})





app.listen(3001, ()=>{
    console.log("Servidor corriendo en el puerto 3001")
})