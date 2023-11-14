import React, {useState} from 'react';
import { SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';

export default function SignIn() {

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  //Controlar login true ou false;
  const [ type, setType ] = useState(false);

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
        placeholder='Sua senha?'
        placeholderTextColor="#99999B"
        />

        <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder='Sua senha'
        placeholderTextColor="#99999B"
        />

        <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: type ? '#f53745' : '#57dd86'}]}>
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