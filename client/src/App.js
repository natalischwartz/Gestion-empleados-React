
import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'



function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();


  const [editar, setEditar] = useState(false);

  const [empleadosList,setEmpleados] = useState([])

  const add = () =>{
    Axios.post("http://localhost:3001/create",{
      //cuerpo de mensaje
      //nombre del campo- la variable q lo representa
      nombre:nombre,
      edad: edad,
      pais:pais,
      cargo:cargo,
      anios:anios

    }).then(()=>{
      limpiarCampos();
      Swal.fire({
        title: "<strong> Registro exitoso</strong>",
        html: `<i> El empleado ${nombre}  fue registrado con éxito!</i>`,
        icon: "success"
      });
    });
  }

  const update = () =>{
    Axios.put("http://localhost:3001/update",{
      //cuerpo de mensaje
      //nombre del campo- la variable q lo representa
      id:id,
      nombre:nombre,
      edad: edad,
      pais:pais,
      cargo:cargo,
      anios:anios

    }).then(()=>{
      getEmpleados();
      alert("Empleado actualizado")
      limpiarCampos();
    });
  }

  const limpiarCampos = () =>{
    setNombre("")
    setEdad("")
    setPais("")
    setCargo("")
    setAnios("")
    setEditar(false)
  }

  const editarEmpleado = (empleado) =>{
    setEditar(true);

    setNombre(empleado.nombre)
    setEdad(empleado.edad)
    setPais(empleado.pais)
    setCargo(empleado.cargo)
    setAnios(empleado.anios)
    setId(empleado.id)

  }


  const getEmpleados = () =>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data)
    });
  }

  getEmpleados();
  

  return (
    <div className='container'>
      <div className="App">
        <div className="card text-center">
          <div className="card-header">
          Gestión de empleados
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre:</span>
              <input
              onChange={(event) =>{
              setNombre(event.target.value);
              }}
              type="text" className="form-control" value={nombre}  placeholder="Ingrese nombre" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Edad:</span>
              <input
              onChange={(event) =>{
              setEdad(event.target.value);
              }}
              type="number" className="form-control" value={edad} placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">País:</span>
              <input
              onChange={(event) =>{
              setPais(event.target.value);
              }}
              type="text" className="form-control" value={pais} placeholder="Ingrese país" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Cargo:</span>
              <input
              onChange={(event) =>{
              setCargo(event.target.value);
              }}
              type="text" className="form-control" value={cargo} placeholder="Ingrese cargo" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
              <input
              onChange={(event) =>{
              setAnios(event.target.value);
              }}
              type="number" className="form-control"  value={anios} placeholder="Ingrese años" aria-label="Username"   aria-describedby="basic-addon1"/>
            </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            editar==true ? 
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info' onClick={limpiarCampos} >Cancelar</button>
            </div> :
            <button className='btn btn-success' onClick={add}>Registrar</button>
          }
          
        </div>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {
            empleadosList.map((empleado,key) =>{
              return <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.edad}</td>
                <td>{empleado.pais}</td>
                <td>{empleado.cargo}</td>
                <td>{empleado.anios}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                    onClick={()=>{
                      editarEmpleado(empleado)

                    }}
                    className="btn btn-info">Editar</button>
                    <button type="button" className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
                


            </tr>
          })

          } 
        </tbody>
      </table>    
      </div>
      
  </div>
  );
}

export default App;
