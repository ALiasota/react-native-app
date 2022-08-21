import React, { useState, useEffect} from "react";

import {
  StyleSheet,
  Text,
  View,  
  Image
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from 'expo-location';
import { TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootTabParamList } from "../../router";


type Props = NativeStackScreenProps<RootTabParamList, 'Create'>;
export default function CreateScreen({ navigation }: Props) {
    useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }      
    })();
  }, []);
    const [camera, setCamera] = useState<any>();
    const [photo, setPhoto] = useState<string>('');
    const takePhoto = async () => {
        const photo = await camera.takePictureAsync()
        let location = await Location.getCurrentPositionAsync({});
        
        setPhoto(photo.uri);
    };
    const sendPhoto = () => {
        navigation.navigate("Posts", {photo});
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera}>
               {photo &&  <View style={styles.tekePhotoCont}>
                    <Image source={{ uri: photo }} style={{height:190, width:190, borderRadius:10,} } />
                </View>}
                <TouchableOpacity style={styles.snapCont} onPress={takePhoto}>
                    <Text style={styles.snap}>SNAP</Text>
                </TouchableOpacity>
            </Camera>
            <TouchableOpacity style={styles.sendBtn } onPress={sendPhoto}>
                    <Text style={styles.sendLabel}>Send</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems:"center"
    },
    camera: {
        flex: 1,
        height: "70%",
        borderRadius:10,
        // height: 300,
        // marginTop: 50,
        alignItems: "center",
        justifyContent:"flex-end"
    },
    snapCont: {
        borderWidth: 1,        
        borderColor: "#fff",
        borderRadius:10,
        width: 70,
        height: 70,
        marginBottom: 20,
        alignItems: "center",
        justifyContent:"center"
    },
    snap: {       
        color:"#fff"
    },
    tekePhotoCont: {
        position: "absolute",
        borderRadius:10, 
        top: 50,
        left: 10,
        borderWidth: 1,        
        borderColor: "#fff",
        height: 200,
        width:200
    },
    sendBtn: {
        marginHorizontal: 30,
        height: 40,
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 10,
        marginTop: 20,
        justifyContent: "center",
        alignItems:"center"
    },
    sendLabel: {
        color: "red",
        fontSize: 20
    }
})