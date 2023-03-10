

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  Image
} from 'react-native';

import Header from './Componentes/Header';
import Formulario from './Componentes/Formulario';
import axios from 'axios';
import Cotizacion from './Componentes/Cotizacion';


function App(): JSX.Element {
  
  
  
  const [moneda, guardarMoneda] = useState('')
  const [criptoMoneda, guardarCriptoMoneda] = useState('')
  const [consultarAPI, guardarConsultarAPI] = useState(false)
  const [resultado, guardarResultado] = useState({})
  const [cargando, guardarCargando] =useState(false)



  useEffect(() => 
  {

    const cotizarCriptomoneda = async () => {
      if(consultarAPI)
      {
       
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        console.log('este es la ', url)
        const resultado = await axios.get(url)
        
        //Ocultar el spinner y mostrar resultado
        guardarCargando(true)
        setTimeout(() => {
          guardarResultado(resultado.data.DISPLAY[criptoMoneda] [moneda])
          guardarConsultarAPI(false)
          guardarCargando(false)
        }, 3000);
      }
    }
    cotizarCriptomoneda()
  }, [consultarAPI])



  //mostrar el spinner
  const componente = cargando ? <ActivityIndicator size='large' color='#5e49e2'/> :<Cotizacion resultado={resultado}/>
  return (
    <>
    <ScrollView>
    <Header/>
    <Image
      source={require('./assets/img/cryptomonedas.png')}
      style={styles.imagen}
    />
    <View style={styles.contenido}> 
      <Formulario
        moneda={moneda}
        guardarMoneda={guardarMoneda}
        criptoMoneda={criptoMoneda}
        guardarCriptoMoneda={guardarCriptoMoneda}
        guardarConsultarAPI={guardarConsultarAPI}
      />

      
    </View>
    <View style={styles.spinner}>
      {componente}
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  imagen:
  {
    width:'100%', 
    height:150,
    marginHorizontal: '2.5%'
  },
  contenido:
  {
    marginHorizontal: '2.5%'
  },
  spinner:
  {
    paddingTop:20
  }
});


export default App;
