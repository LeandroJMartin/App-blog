import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList }  from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import api from '../services/api'

import CategoryItem from '../components/categories'
import FavoritePost from '../components/FavoritePost'
import { getFavorite, setFavorite } from '../services/favorite'

export default function Home(){

  const navigation = useNavigation();
  const [ categories, setCategories ] = useState([])
  const [ favCategory, setFavCategory ] = useState([])

  useEffect( () => {

    async function loadData(){

      const category = await api.get('/api/categories?populate=icon')
      setCategories( category.data.data )

    }loadData();

  },[])

  useEffect( () => {

    async function favorite(){

      const response = await getFavorite()
      setFavCategory(response)

    }favorite()

  })

  async function handleFavorite(id){

    const response = await setFavorite(id)

    setFavCategory(response)
    alert('Categoria favoritada')

  }


  return(
    <SafeAreaView style={style.container}>

      <View style={style.header}>
        <Text style={style.title}>Home</Text>

        <TouchableOpacity onPress={ () => navigation.navigate("Search") }>
          <Feather name="search" size={24} color="#fff"/>
        </TouchableOpacity>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingRight: 12 }}
        style={style.categories}
        data={categories}
        keyExtractor={ (item) => String(item.id) }
        renderItem={ ({item}) => (
          <CategoryItem
            data={item}
            favorite={ () => handleFavorite( item.id ) }
          />
        ) }
      />


      <View style={style.main}>

        {favCategory.lenght !== 0 && (
          <FlatList
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18, }}
            data={favCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={ (item) => String(item.id) }
            renderItem={ ({item}) => (
              <FavoritePost
                data={item}
              />
            ) }
          />
        ) }

      </View>

    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#232630'
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24
  },
  title:{
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  categories:{
    maxHeight: 115,
    backgroundColor: '#efefef',
    marginHorizontal: 18,
    borderRadius: 5,
    zIndex: 9
  }
})
