import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/ModalNewRoom';

export default function ChatRoom() {

  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    //Verificando se o usuário está logado
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;

    setUser(hasUser);


  }, [isFocused])

  function handleSignOut(){

    auth().signOut()
    .then(() => {
      setUser(null);
      navigation.navigate('SignIn');
    })
    .catch((error) => {
      console.log(error);
    })

  }

 return (

    <SafeAreaView style={styles.container}>

        <View style={styles.headerRoom}>

          <View style={styles.headerRoomLeft}>

              <TouchableOpacity onPress={handleSignOut}>

                {user && (
                  <MaterialIcons name="arrow-back" size={28} color="#fff"/>
                )}
                
              </TouchableOpacity>

              <Text style={styles.title}>Grupos</Text>
                
          </View>

          <TouchableOpacity>
            <MaterialIcons name="search" size={28} color="#fff"/>
          </TouchableOpacity>

        </View>

        <FabButton setVisible={ () => setModalVisible(true)} userStatus={user}/>

        <Modal visible={modalVisible} animationType='fade' transparent={true}>
          <ModalNewRoom setVisible={ () => setModalVisible(false)}/>
        </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  headerRoom:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2e54d4',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerRoomLeft:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  title:{
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 10,
  }
})