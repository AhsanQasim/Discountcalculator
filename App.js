import React, { useState , useEffect, useLayoutEffect} from 'react';
import { Text, View, StyleSheet, TextInput, TextInputComponent, ScrollView, TouchableOpacity, Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

 function homescreen({ navigation, route }){

  const [getprice, setprice] = useState('')
  const [getdsc, setdsc] = useState('')
  const [fp, setfp] = useState('')
  const [sav, setsav] = useState('')
  const [datah, setdatah] = useState([])

  
  const pricefunc = (e) =>{
    if(e >= 0){
    setprice(e)
    calculatefp(e)}
    else{
      alert("Postive number only");
    }
  }

  const getdscfunc = (e) =>{
    if(e < 100){
    setdsc(e)
    calculatefp(e)}
    else{
      alert("getdsc should be less then 100");
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title = "History"  onPress={() =>
          navigation.navigate('History',{
            historydata: datah 
          })
        } ></Button>
      ),
    })
  })

  const calculatefp =(e)=>{
    setfp(getprice * (getdsc/100))
    setsav(getprice - fp)
  }

  function newlist(){
    if (!getprice.trim() || !getdsc.trim()) {
      return;
    }
    else{
      setdatah([
                ...datah,
                {key: Math.random().toString(), op: getprice, dsc: getdsc, fp: fp}
                ])
      setprice('')
      setdsc('')
    }
  }

  
  return(
      <View style={styles.container}>
      <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:25, color: 'black', margin:10}}>Discount Me</Text>
      
      <View style={{flexDirection: "row"}}>
       
        <View style={{justifyContent:'center'}}>
        <Text>{"\n"}</Text>
        <Text style={{ fontSize: 15, color: 'black', fontWeight:'bold'}}> Total price : </Text>
          <TextInput style={styles.input}
          color = 'white'
          keyboardType = 'numeric'
          value={getprice}
          onChangeText={(val) => {pricefunc(val)}}
          ></TextInput>
        </View>
      </View>

      <View style={{flexDirection: "row"}}>
      
        <View>
        <Text style={{ fontSize: 15, color: 'black', fontWeight:'bold'}}> Total Discount :</Text>
          <TextInput 
          style={styles.input}
          keyboardType = 'numeric'
          value={getdsc}
          onChangeText={(val) => {getdscfunc(val)}}
          ></TextInput>
        </View>
      </View>
      <Text>{"\n"}</Text>
      <Button style={{ backgroundColor: 'black'}} title = "Save" onPress={newlist} ></Button>
      <Text>{"\n"}</Text>
      
      <Text>{"\n"}</Text>
   
      <Text style={{ fontSize: 25, color: 'black', fontWeight:'bold'}}> Final Price :  {sav}</Text>
      <Text style={{fontSize: 25, color: 'black', fontWeight:'bold'}}> You Save :  {fp}</Text>
      
      <Text>{"\n"}</Text>
      
      </View>
    );
  }

function historyscreen({ navigation, route }){


  const {historydata} = route.params;
  const [datah,setdatah] = useState(historydata)

  const deletelistitem =(itemkey)=>{
    setdatah(list => datah.filter(item => item.key != itemkey));
  }

  function clearhistory(){
    setdatah([])
  }

   useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title = "Clear"  onPress={clearhistory} ></Button>
      ),
    })
  })

   return(
     <View style={styles.container}>   
     <Text style={{alignSelf: 'center', fontWeight:'bold', color:'black', fontSize:40}}>HISTORY</Text>
     <ScrollView style={styles.scrollview}>
      {datah.map((item) =>
      <TouchableOpacity
      key={item.key}
      activeOpacity= {0.5}
      >
      <View
      style={styles.scrollViewItem}
      >
      <Text style={{fontWeight:'bold', fontSize:25}}>{item.op}</Text>
      <Text style={{fontWeight:'bold', fontSize:25}}>{item.dsc}</Text>
      <Text style={{fontWeight:'bold', fontSize:25}}>{item.fp}</Text>
      <TouchableOpacity
      onPress={()=>deletelistitem(item.key)}
      >
      <View style={styles.crossview}>
      <Text style={styles.cross}>DEL</Text>
      </View>
      </TouchableOpacity>
      </View>
      </TouchableOpacity>
      )}
    </ScrollView>
     </View>
   )
 }

export default function App() {

  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={homescreen} 
    options={({ navigation, route }) => ({
            headerRight:()=> (
              <Button
                title="HISTORY"
                color="#00cc00"
              />
            ),
          })}/>
    <Stack.Screen name="History" component={historyscreen}
    options={({ navigation, route }) => ({
            headerRight:()=> (
              <Button
                onPress={() => alert('This is a bueetton!')}
                title="Clear"
                color="#00cc00"
              />
            ),
          })} />
    </Stack.Navigator>
    </NavigationContainer>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor:'white'

  },
  input:{
    alignSelf:"center",
    borderWidth: 4,
    padding: 20,
    width: 300,
    margin: 5,
    justifyContent: 'center',
    backgroundColor: '#dce0e0',
    borderColor: '#4d5252'
  },
  scrollViewItem:{
    width : '100%',
    alignSelf: "center",
    padding: 10,
    margin: 5,
    justifyContent: "space-between",
    flexDirection : 'row',
    backgroundColor: 'white',
    borderRadius: 5
    
  },
  scrollview:{
    width : '100%',
  },
  cross:{
    fontWeight:'bold',
    color:'red'
  },
  crossview:{
    backgroundColor:'black',
    borderRadius: 50,padding : 5, width:30,
    justifyContent: 'center',
    alignItems:"center"
  }
}
)