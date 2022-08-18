import React, { useEffect, useState } from "react";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,  
  Dimensions,
} from "react-native";

type formType = {
  email: string,
  password: string
}

const initialState:formType = {
  email: '',
  password: ''
}

const loadAppLication = async()=>{
  await Font.loadAsync({
    'DMMono-Regular':require('./assets/fonts/DMMono-Regular.ttf'),
  })
}

export default function App() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState<boolean>(false);
  const [state, setState] = useState<formType>(initialState);
  const[isReady, setIsReady] = useState<boolean>(false);
  const[dimensions, setDimensions] = useState<number>(Dimensions.get('window').width - 20 * 2)
  useEffect(()=>{
    const onChange = ()=>{
      const width = Dimensions.get("window").width;
    console.log(width);
    }
    
    Dimensions.addEventListener('change', onChange);
    return(()=>{
      Dimensions.removeEventListener('change', onChange);
    })
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  if(!isReady) {
    return <AppLoading 
    startAsync={loadAppLication} 
    onFinish={()=>setIsReady(true)}
    onError={console.warn}
    />
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>      
        <ImageBackground
          style={styles.image}
          source={require("./assets/images/111.jpeg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : undefined}
          >
            <View
              style={{ ...styles.form, marginBottom: isShowKeyboard ? 20 : 100, width:dimensions }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Hello</Text>
                <Text style={styles.headerTitle}>Welcome</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>EMAIL ADDRESS</Text>
                <TextInput
                  value={state.email}
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value:string)=>setState((prvState)=>({...prvState, email:value}))}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <TextInput
                  value={state.password}
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value:string)=>setState((prvState)=>({...prvState, password:value}))}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>      
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 40,
    borderRadius: 6,

    color: "#f0f8ff",
  },
  form: {
    marginHorizontal: 40,
  },
  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#4169e1",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
    fontSize: 18,
  },
  header:{
    alignItems:"center",
    marginBottom:150,
  },
  headerTitle:{
    fontSize:30,
    color:"#fff",
    fontFamily:"DMMono-Regular",
  }
});