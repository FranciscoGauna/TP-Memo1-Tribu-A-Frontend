
import { OpcionSelector } from "@/interfaces/recursos"
import { useRef,useEffect } from "react"
import StateManagedSelect, { GroupBase } from "react-select"
import Select from "react-select"

interface ModalProps {
    titulo:string
    opciones:OpcionSelector[]
    
    setopcionSeleccionada: Function
    opcionesProyecto?: string
    
}

export const OpcionModal = ({titulo, opciones,setopcionSeleccionada,opcionesProyecto}:ModalProps) => {
    
    
        const handleSelectChange = (event:any) =>{
            if(!event){
                console.log("no tengo valor")
                setopcionSeleccionada("")
                return
            }
            setopcionSeleccionada(event.value.toString())
        }
        const selectRef:any = useRef(null);

        const handleClear = () => {
            if(selectRef){
                selectRef.current.clearValue();
            }
           
        };
        useEffect(() => {
          
            handleClear()
            

        }, [opcionesProyecto])
        

    return(
        <>
            <p className="text-sm text-gray-500 py-4">{titulo}</p>
                            <Select 
                                ref={selectRef}
                                className="w-full "
                                
                                //defaultValue={opcionDefecto}
                                noOptionsMessage= {()=>{ return "Primero seleccione un proyecto"}}
                                styles={{
                                    control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor:'#F4F5F7',
                                  
                                    }),
                                    singleValue:(styles)=>({
                                        ...styles,
                                        color:'#666666'
                                    })
                                }}
                                options={opciones}
                                onChange={handleSelectChange}
                                placeholder="Seleccione una opcion"
                                //value={{"label": "", "value":"","color":"#FFFFFF"}}
                            />
                             
        </>
    )
}