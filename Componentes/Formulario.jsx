import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'


const Formulario = ({moneda, guardarMoneda, criptoMoneda, guardarCriptoMoneda, guardarConsultarAPI}) => {
  
  const [criptoMonedas, guardarCriptoMonedas] = useState([])

  useEffect(() => 
  {
    const consultarAPI = async ()=>
    {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const resultado = await axios.get(url)
      guardarCriptoMonedas(resultado.data.Data)

    }
    consultarAPI()
  },[])

  //Almacena las elecciones del usuario
  const obtenerMoneda = moneda =>
  {
    guardarMoneda(moneda)
  }
  const obtenerCripto = crypto =>
  {
    guardarCriptoMoneda(crypto)
  }


  const cotizarPrecio = ()=>
  {
    if(moneda.trim() === '' || criptoMoneda.trim() === '')
    {
      mostrarAlerta()
      return;
    }

    //si pasa la validacion
    guardarConsultarAPI(true)
  }


  const mostrarAlerta = () =>
  {
    Alert.alert
    (
      'Error...',
      'Ambos campos son obligatorios',
      [{text:'OK'}]
    )
  }

  return (
    <View>
      <Text style={styles.label}>
        Moneda
      </Text>
      <Picker
        selectedValue={moneda}
        onValueChange={moneda => obtenerMoneda(moneda) }
        itemStyle={{height:120}}
      >
        <Picker.Item 
          label='-- Seleccione --'
          value=''
        />
        <Picker.Item 
          label='Dolar Estados Unidos'
          value='USD'
        />
        <Picker.Item 
          label='Peso Colombiano'
          value='COP'
        />
        <Picker.Item 
          label='Euro'
          value='EUR'
        />
        <Picker.Item 
          label='Libra Esterlina'
          value='GBP'
        />
      </Picker>



      <Text style={styles.label}>
        CriptomonedaMoneda
      </Text>
      <Picker
        selectedValue={criptoMoneda}
        onValueChange={crypto => obtenerCripto(crypto) }
        itemStyle={{height:120}}
      >
        <Picker.Item 
          label='-- Seleccione --'
          value=''
        />
        {criptoMonedas.map( crypto => 
          (
            <Picker.Item 
              key={crypto.CoinInfo.Id}
              label={crypto.CoinInfo.FullName}
              value={crypto.CoinInfo.Name}
            />
          ))}
      </Picker>

      <TouchableHighlight style={styles.btnCotizar} onPress={() => cotizarPrecio()}>
        <Text style={styles.textoCotizar}>
          Cotizar
        </Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create
({
  label:
  {
    fontFamily:'Lato-black',
    fontSize: 22,
    marginVertical: 20,
    textTransform: 'uppercase'
  },
  btnCotizar:
  {
    backgroundColor:'#5E49E2',
    padding:10,
    marginTop:20,
    
  },
  textoCotizar:
  {
    color:'#FFF',
    fontFamily:'Lato-black',
    fontSize:18,
    textTransform:'uppercase',
    textAlign:'center'
  }
})

export default Formulario
