import React, { useState,useEffect} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

interface OpcionFechaProps{
    setOpcionFecha: Function
    fechaPorDefecto?: string
}

export const OpcionFecha = ({setOpcionFecha, fechaPorDefecto}: OpcionFechaProps) => {
  const [startDate, setStartDate] = useState<Date>();

  const establecerFecha = () =>{
    if(!!fechaPorDefecto){
        const [year, month,day] = fechaPorDefecto.split('-')
        setStartDate(new Date(Number(year),Number(month) - 1,Number(day)))
        
    }
    
  }

  useEffect(() => {
    if(!!fechaPorDefecto){
        
        establecerFecha()
    }
    

  }, [])
  
  return (
    <>
        <p className="text-sm text-gray-500 py-4" style={{color:'#FFFFFF'}}>Fecha de creación</p>
        <DatePicker 
        locale="es"
        selected={startDate}
        placeholderText="Seleccione una fecha" 
        onChange={(date: Date) => {
            setStartDate(date);
            const ceroDecimal = (num:number):string=>{
                if (num < 10){
                    return "0"
                } else{
                    return ""
                }
            }
            const fecha: string = `${date.getFullYear()}-${ceroDecimal(date.getMonth() +1)}${date.getMonth() +1}-${ceroDecimal(date.getDate() )}${date.getDate()}`
            setOpcionFecha(fecha)
        }} 
        
        className="w-[210px] sm:w-[607px] pl-3 h-[3.8vh] bg-[#F4F5F7] text-[#666666] border border-[#CCCCCC] rounded 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        "
        
    />
    </>
  );
};