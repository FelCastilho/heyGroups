import React, {useState} from 'react';
import { SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';

export default function SignIn() {

  const navigation = useNavigation();
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  //Controlar login true ou false;
  //True = Cadastrar || false = Logar
  const [ type, setType ] = useState(false);

  function handleLogin(){

    if(type){
      //Cadastrar User

      if(name === '' || password === '' || email === '') return;

      auth().createUserWithEmailAndPassword(email, password)
      .then( (user) => {

        user.user.updateProfile({
          displayName: name,
        })
        .then(() => {
          navigation.goBack();
        })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Essa email já está sendo usado!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('Esse email é inválido!');
        }
      })

    }else{
      //Logar User
      
      auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.goBack()
      })
      .catch((error) => {

        if (error.code === 'auth/invalid-email') {
          console.log('Esse email é inválido!');
        }

      })
    }

  }

 return (
    <SafeAreaView style={styles.container}>

        <Text style={styles.logo}>HeyGrupos</Text>

        <Text style={{marginBottom: 20, color: '#121212'}}>Ajude, colabore, faça networking</Text>

        
        {type && (

          <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder='Qual o seu nome?'
          placeholderTextColor="#99999B"
          />

        )}

        <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder='Seu email'
        placeholderTextColor="#99999B"
        />

        <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder='Sua senha'
        placeholderTextColor="#99999B"
        secureTextEntry={true}
        />

        <TouchableOpacity 
        onPress={handleLogin}
        style= {[styles.buttonLogin, {backgroundColor: type ? '#f53745' : '#57dd86'}]}>

          <Text style={styles.buttonText}>
            {type ? 'Cadastrar' : 'Acessar'}
          </Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => setType(!type)}>
          <Text style={{color: '#121212'}}>
           {type ? 'Já possuo uma conta' : 'Criar uma nova conta'}
          </Text>
        </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo:{
    marginTop: Platform.OS === 'android' ? 55 : 80,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#121212'
  },
  input:{
    color: '#121212',
    backgroundColor: '#EBEBEB',
    width: "90%",
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 8,
    height: 50
  },
  buttonLogin:{
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 6,
  },
  buttonText:{
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 19
  }
})