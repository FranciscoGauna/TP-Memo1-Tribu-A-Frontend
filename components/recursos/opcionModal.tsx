
import { OpcionSelector } from "@/interfaces/recursos"
import { useRef,useEffect,useState } from "react"
import Select from "react-select"

interface ModalProps {
    titulo:string
    opciones:OpcionSelector[]
    opcionDefecto?:OpcionSelector
    setopcionSeleccionada: Function
    opcionesProyecto?: string
    
}

export const OpcionModal = ({titulo, opciones,setopcionSeleccionada,opcionDefecto,opcionesProyecto}:ModalProps) => {
    
    const [tengoOpcionDefecto,settengoOpcionDefecto] = useState(!!opcionDefecto)
    
        const handleSelectChange = (event:any) =>{
            if(!event){
                
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
          if(!tengoOpcionDefecto){
            
                handleClear()
           
            
          }  
          settengoOpcionDefecto(false)

        }, [opcionesProyecto])
        

    return(
        <>
            <p className="text-sm text-gray-500 py-4" style={{color: '#FFFFFF'}}>{titulo}</p>
                            <Select 
                                ref={selectRef}
                                className="w-full "
                                
                                defaultValue={opcionDefecto}
                                noOptionsMessage= {()=>{ return "Primero seleccione un proyecto"}}
                                styles={{
                                    control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor:'#FFFFFF',
                                  
                                    }),
                                    singleValue:(styles)=>({
                                        ...styles,
                                        color:'#666666'
                                    }),
                                    option: (styles,{data,isDisabled,isFocused, isSelected}) =>{
                                        return {...styles,color:data.color}
                                    }
                                }}
                                options={opciones}
                                onChange={handleSelectChange}
                                placeholder="Seleccione una opción"
                                
                                //value={{"label": "", "value":"","color":"#FFFFFF"}}
                            />
                             
        </>
    )
}