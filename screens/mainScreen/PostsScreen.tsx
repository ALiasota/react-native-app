import React, { useEffect, useState } from 'react';

import { StyleSheet, Image, View, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootTabParamList } from "../../router";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";

type Props = NativeStackScreenProps<RootTabParamList, 'Posts'>;
export type PostParamList = {
  Map: undefined;
  Comments: undefined;
  
};

const NestedScreen = createNativeStackNavigator<PostParamList>();
export default function PostsScreen({ route, navigation }: Props) {
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params.photo]);
    }   
  }, [route.params])
  
  return (
    <>
    <View style={styles.container}>
      <FlatList data={posts}
        keyExtractor={(item, index) => index.toString()}
      renderItem={({ item })=> <View style={{marginBottom:10}}><Image style={{width:350, height:200}} source={{uri: item}}/></View>}/>
    </View>
    {/* <NestedScreen.Navigator>
     <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
      </NestedScreen.Navigator> */}
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
