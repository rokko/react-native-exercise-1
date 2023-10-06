/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type ProdottoInterface= {
    item :{
      thumbail:string,
      title:string,
      description:string
    }
}

function ComponentLista({prodotto}): JSX.Element {
  console.log(prodotto.item)
  return (
    
    <View style={{marginTop:10}}>
      <Image source={{uri:prodotto.item.thumbnail}} style={{width:200, height:200}}/>
      <Text>{prodotto.item.title}</Text>
      <Text>{prodotto.item.description}</Text>
    </View>
  );
}

function App(): JSX.Element {
  const [testo, setTesto] = useState<string>('');
  const [lista, setLista] = useState();
  useEffect(() => {
    const ricerca = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${testo}`,
        )
        let json = await response.json();
        setLista(json.products)
      } catch (e) {
        console.error(e);
      }
     
    };
    ricerca();
  }, [testo]);

  return (
    <View style={styles.container}>
      <Text>Inserisci testo ricerca</Text>
      <TextInput value={testo} style={styles.input} onChangeText={setTesto}></TextInput>
       <FlatList
          data={lista}
          renderItem={prodotto => <ComponentLista prodotto={prodotto} 
          keyExtractor={prodotto => prodotto.index}
          />
        }
        /> 
    
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
    flex:1,
    margin:20,
    justifyContent:'center',
    alignItems:'center'
  },
  input : {
    height: 40,
    width:300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }

});

export default App;
