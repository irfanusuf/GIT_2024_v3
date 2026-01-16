import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View  , Button} from 'react-native';

import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { Card, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useNavigation  } from '@react-navigation/native';
// import { Button } from '@react-navigation/elements';
// import { Button } from '../components/ui/Button';

export default function Register() {



  const [username, setusername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigation = useNavigation<any>();



  const handleLogin = async()  => {
    const formData = { username, email, password }

    const res = await axios.post("/user/register" , formData)

    if(true){
        // window.alert("kmbnfdkjbn")   // browser 
        // Alert.alert("Registered Succesfully")   // 
        navigation.navigate('Snake')
        
    }

   
  

  }



  return (

    <View style={styles.container}>


      <Card>
        <View>

          <CardHeader title='Register' description='Welcome to devsOutreact , kindly Create Your Account here ' />

          <Input
            placeholder='Enter your username'
            value={username}
            onChangeText={(text) => setusername(text)}
          />

          <Input
            placeholder='Enter your Email'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Input
            placeholder='Enter your Password'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />

          <Button  onPress={handleLogin} title='SignUp ' />
        </View>


            

      </Card>






      <StatusBar style="auto" />
    </View>

  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {

    fontSize: 30
  }
  ,
  button: {
    backgroundColor: "blue"

  }
});
