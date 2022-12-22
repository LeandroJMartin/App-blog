import React from 'react'
import { View, Text, StyleSheet }  from 'react-native'

export default function Category(){
  return(
    <View style={style.container}>
      <Text>Página Categoria!</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
