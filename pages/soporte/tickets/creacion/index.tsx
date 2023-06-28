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
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
    const handleSubmit = (e) => {
    e.preventDefault();
    // Cambiar a POST request de api soporte
    console.log(formData);
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
    <div className="container max-w-7xl mx-auto mt-8">
      <div className="mb-5">
        <h1 className="text-4xl font-bold decoration-gray-400 mb-10">Soporte</h1>
        <h2 className="text-2xl font-bold decoration-gray-400 mb-2">Crear ticket</h2>
      </div>
      <div className="rounded-lg p-6 shadow-md space-y-4" style={{ backgroundColor: "#F5F5F5" }}>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <label htmlFor="nombre" className="font-bold">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />

            <label htmlFor="descripcion" className="font-bold">Descripcion:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>
          <br/>
          <div className="flex space-x-4">
            <label htmlFor="cliente" className="font-bold">Cliente:</label>
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


            <label htmlFor="proyecto" className="font-bold">Proyecto:</label>
            <select
              id="proyecto"
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
          </div>
          <div className="flex space-x-4">
            <label htmlFor="prioridad" className="font-bold">Prioridad:</label>
            
            <label>
              <input
                type="radio"
                name="prioridad"
                value="baja"
                checked={formData.prioridad === 'baja'}
                onChange={handleChange}
              />
              Baja
            </label>
            <label>
              <input
                type="radio"
                name="prioridad"
                value="media"
                checked={formData.prioridad === 'media'}
                onChange={handleChange}
              />
              Media
            </label>
            <label>
              <input
                type="radio"
                name="prioridad"
                value="alta"
                checked={formData.prioridad === 'alta'}
                onChange={handleChange}
              />
              Alta
            </label>
          </div>
          <div className="flex space-x-4">
            <label htmlFor="severidad" className="font-bold">Severidad:</label>
            
            <label>
              <input
                type="radio"
                name="severidad"
                value="s1"
                checked={formData.severidad === 's1'}
                onChange={handleChange}
              />
              S1
            </label>
            <label>
              <input
                type="radio"
                name="severidad"
                value="s2"
                checked={formData.severidad === 's2'}
                onChange={handleChange}
              />
              S2
            </label>
            <label>
              <input
                type="radio"
                name="severidad"
                value="s3"
                checked={formData.severidad === 's3'}
                onChange={handleChange}
              />
              S3
            </label>
            <label>
              <input
                type="radio"
                name="severidad"
                value="s4"
                checked={formData.severidad === 's4'}
                onChange={handleChange}
              />
              S4
            </label>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="mt-2 px-4 py-2 text-white rounded-md"
                style={{ backgroundColor: "#185FA1" }}>Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
