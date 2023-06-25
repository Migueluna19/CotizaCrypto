import {useEffect, useState} from 'react'
import { monedas } from '../data/monedas'
import Error from './Error'
import styled from '@emotion/styled'
import useSelectMonedas from '../Hooks/useSelectMonedas'

const InputSumbit=styled.input`
background-color:#9497FF;
border:none;
width:100%;
padding:10px;
color: #fff;
font-weight:700;
text-transform:uppercase;
font-size:20px;
border-radius:5px;
margin-top:30px;
&:hover{
    background-color:#7A7DFE;
    transition: background-color .3s ease;
    cursor: pointer;
}
`

function Formulario({setMonedas}) {

    const [criptos,setCriptos]=useState([]);
    const [error,setError]=useState(false);
    const [moneda,SelectMonedas]=useSelectMonedas('Elige tu Moneda',monedas);
     const [criptomoneda,SelectCriptomonedas]=useSelectMonedas('Elige tu CriptoMoneda',criptos);

    useEffect(()=>{
        const ConsultarApi =async()=>{
            const url="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta= await fetch(url)
            const resultado=await respuesta.json()
            const arrayCriptos=resultado.Data.map(cripto=>{
                const objeto={
                    id:cripto.CoinInfo.Name,
                    name: cripto.CoinInfo.FullName
                }
               return objeto
            })
            setCriptos(arrayCriptos)
        }
        ConsultarApi();
    },[])

    function handleSubmit(e){
        e.preventDefault();
        if([moneda,criptomoneda].includes('')){
            setError(true);
            return
        }
        setError(false);
        setMonedas({
            moneda,
            criptomoneda
        })
    }

  return (
    <>
    {error&& <Error>Todos los campos son obligatorios</Error>}
   <form onSubmit={handleSubmit}>
    <SelectMonedas/>
    <SelectCriptomonedas/>
    <InputSumbit
    type='submit'
    value='Cotizar'
    />
   </form>
   </>
  )
}

export default Formulario