import { View, TouchableOpacity, ScrollView, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useStateContext } from '@/context/useStateContext'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { CategoryInfo, CategoryItems } from '@/components'
import { supabase } from '@/services/supabase'

const CategoryDetail = () => {

  const { currentCategory: category, setCurrentCategory } = useStateContext()
  const { categoryId }: { categoryId: string } = useLocalSearchParams()
  const router = useRouter()

  const [loading, setLoading] = useState(false)


  const onRefresh = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('Category')
        .select('*, CategoryItem(*)')
        .eq('id', category?.id)

      if (data)
        setCurrentCategory(data[0])

      if (error)
        ToastAndroid.show('Failed to refresh', ToastAndroid.SHORT)

      setLoading(false)
    }
    catch (err) {
      console.log('Error refreshing records: ', err)
    }
  }


  return (
    <View style={{ padding: 20, marginTop: 20, flex: 1 }} >

      <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={loading} />} showsVerticalScrollIndicator={false} >
        <TouchableOpacity onPress={() => router.replace('/home')} >
          <Ionicons name='arrow-back-circle' size={44} color={Colors.BLACK} />
        </TouchableOpacity>

        <CategoryInfo />

        <CategoryItems categoryItems={category.CategoryItem} updateRecords={onRefresh} />
      </ScrollView>

      <Link href={{ pathname: '/add-category-item', params: { categoryId: category?.id } }} style={{ position: 'absolute', bottom: 16, right: 16, }} >
        <Ionicons name='add-circle' size={60} color={Colors.PRIMARY} />
      </Link>

    </View>
  )
}

export default CategoryDetail