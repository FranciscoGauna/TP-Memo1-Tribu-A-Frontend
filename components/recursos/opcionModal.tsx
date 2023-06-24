
import { OpcionSelector } from "@/interfaces/recursos"
import Select from "react-select"

export const OpcionModal = ({titulo, opciones, opcionDefecto,setopcionSeleccionada}:
    {titulo:string,opciones:Array<OpcionSelector>, opcionDefecto:OpcionSelector ,setopcionSeleccionada:Function}) => {
    
    
        const handleSelectChange = (event:any) =>{
            setopcionSeleccionada(event.value.toString())
        }
    

    return(
        <>
            <p className="text-sm text-gray-500 py-4">{titulo}</p>
                            <Select 
                                className="w-full "
                                
                                defaultValue={opcionDefecto}
                                //noOptionsMessage= {()=>{ return "Primero seleccione un proyecto"}}
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
                            />
        </>
    )
}