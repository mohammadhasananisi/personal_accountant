import React, { Component, useEffect,useState } from 'react';
import {
  
  View,
  Image,
  StyleSheet,
} from 'react-native';
// import {  LocalAuthentication } from 'expo';
import * as LocalAuthentication from 'expo-local-authentication';
import Constants  from 'expo-constants';

const Login = (props) =>{
    const [Login_c, setLogin_c] = useState(true);

    const componentDidMount = ()=> {
        checkDeviceForHardware();
        checkForFingerprints();
      }
      
      const checkDeviceForHardware = async () => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        // this.setState({ compatible });
      };
    
      const checkForFingerprints = async () => {
        let fingerprints = await LocalAuthentication.isEnrolledAsync();
        // console.log(fingerprints);
        return fingerprints;
        
        // this.setState({ fingerprints });
      };
    
      const scanFingerPrint = async () => {
        try {
            const results = await LocalAuthentication.authenticateAsync();
            if (results.success) {
                props.navigation.navigate('ChoseUsers');
            } else {
                return scanFingerPrint();
            }
        } catch (e) {
            console.log(e);
        }
    };


      useEffect(() =>{
        componentDidMount();
        scanFingerPrint();
        console.log('scanFingerprint()');
        
      },[]);
      
    
    return(
        <View style={styles.imageContainer}>
            <Image source={require('../assets/fingerprints-FB-1.jpg')} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer:{
        flex:1,
    },
    image:{
        width:"100%",
        height:"100%",
    }
});
export default Login;