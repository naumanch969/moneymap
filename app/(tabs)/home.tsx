import { View, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { supabase } from '@/services/supabase'
import { CategoryList, Chart, Header } from '@/components'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Category } from '@/interfaces'

const Home = () => {

  const { user } = useUser()

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('Category')
      .select('*,CategoryItem(*)')
      .eq('created_by', user?.primaryEmailAddress?.emailAddress)

    setCategories(data as Category[])
    setLoading(false)
  }

  return (
    <View style={{ height: '100%' }} >

      <ScrollView refreshControl={<RefreshControl onRefresh={getCategories} refreshing={loading} />} >
        <View style={{ paddingTop: 50, padding: 20, backgroundColor: Colors.PRIMARY, height: 160 }} >
          <Header />
        </View>
        <View style={{ padding: 20, marginTop: -75 }} >
          <Chart categories={categories} />
          <CategoryList categories={categories} />
        </View>
      </ScrollView>

      <Link href='/add-category' style={{ position: 'absolute', bottom: 8, right: 8 }} >
        <Ionicons name='add-circle' size={64} color={Colors.PRIMARY} />
      </Link>
    </View>
  )
}

export default Home