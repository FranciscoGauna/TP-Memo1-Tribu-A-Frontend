import { Cliente, Project } from '@/components/types';
import React, { useState, useEffect } from 'react';

const FormPage = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        cliente: '',
        project: '',
        prioridad: '',
        severidad: ''
    });
    const [clienteOptions, setClienteOptions] = useState<Cliente[]>([]);
    const [projectOptions, setProjectOptions] = useState<Project[]>([]);

    const handleChange = (e) => {
        const { nombre, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [nombre]: value
        }));
      };
    
    const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
    };
    
    const handleFetchOptions = async () => {
    // Fetch cliente options
    await fetchClienteOptions();

    // Fetch project options
    await fetchProjectOptions();
    };

    useEffect(() => {
        fetch(`https://tp-memo1-tribu-a-soporte.onrender.com/clientes`)
            .then((res) => res.json())
            .then((data) => {
            setClienteOptions(data);
            })
            .catch((error) => {
            console.error('Error fetching API data:', error);
            });
    });

    useEffect(() => { 
      fetch(`https://projects-backend-service.onrender.com/projects`)
            .then((res) => res.json())
            .then((data) => {
            setProjectOptions(data.projects);
            })
            .catch((error) => {
            console.error('Error fetching API data:', error);
            });
    });

  return (
    <div>
      <h1>Crear ticket</h1>
      <br/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        <br/>

        <label htmlFor="descripcion">Descripcion:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />

        <br/>

        <label htmlFor="cliente">Cliente:</label>
        <select
          id="cliente"
          name="cliente"
          value={formData.cliente}
          onChange={handleChange}
        >
          <option value="">Selecciona un cliente</option>
          {clienteOptions.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.razonSocial}
            </option>
          ))}
        </select>

        <br/>

        <label htmlFor="project">Project:</label>
        <select
          id="project"
          name="project"
          value={formData.project}
          onChange={handleChange}
        >
          <option value="">Selecciona un proyecto</option>
          {projectOptions.map((project) => (
            <option key={project.uid} value={project.uid}>
              {project.name}
            </option>
          ))}
        </select>

        <br/>
        
        <label htmlFor="prioridad">prioridad:</label>
        <select
          id="prioridad"
          nombre="prioridad"
          value={formData.prioridad}
          onChange={handleChange}
        >
          <option value="">Selecciona una prioridad</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <br/>
        
        <label htmlFor="severidad">severidad:</label>
        <select
          id="severidad"
          name="severidad"
          value={formData.severidad}
          onChange={handleChange}
        >
          <option value="">Selecciona una severidad</option>
          <option value="s1">S1</option>
          <option value="s2">S2</option>
          <option value="s3">S3</option>
          <option value="s4">S4</option>
        </select>

        <br/>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
