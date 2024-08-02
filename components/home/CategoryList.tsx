import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { useRouter } from 'expo-router'
import { Category, CategoryItem } from '@/interfaces'
import { useStateContext } from '@/context/useStateContext'
import { Colors } from '@/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CategoryList = ({ categories }: { categories: Category[] }) => {

  const router = useRouter()
  const { setCurrentCategory } = useStateContext()

  const onPress = (category: Category) => {
    router.push({ pathname: '/category-detail', params: { categoryId: category?.id } })
    setCurrentCategory(category)
  }

  return (
    <View style={{ marginTop: 20, }} >
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >Latest Budget</Text>

      <View style={{ marginTop: 10 }} >
        {
          categories?.map((category, index) => {

            const totalSpended = category?.CategoryItem?.reduce((acc: number, item: CategoryItem) => acc + item.cost, 0)
            const progress = (totalSpended / category?.budget) * 100 || 0

            return (
              <View style={{ position: 'relative', marginBottom: 10, borderRadius: 15, overflow: 'hidden', backgroundColor: Colors.WHITE, }} >
                <TouchableOpacity key={index} onPress={() => onPress(category)} style={{ zIndex: 100, padding: 10, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 15 }} >
                  <View style={{ width: 60, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: category?.color, borderRadius: 15 }} >
                    <Text style={{ fontSize: 25, color: Colors.WHITE, textTransform: 'uppercase' }} >{category?.icon}</Text>
                  </View>
                  <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <View>
                      <Text style={{ fontFamily: 'outfit-bold', fontSize: 17, }} >{category?.name}</Text>
                      <Text style={{ fontFamily: 'outfit' }} >{category?.CategoryItem?.length} items</Text>
                    </View>
                    <Text style={{ fontFamily: 'outfit-bold', fontSize: 16 }} >
                      <MaterialCommunityIcons name="currency-rupee" size={16} color={Colors.GRAY} /> {totalSpended}/{category?.budget}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={{ position: 'absolute', height: '100%', width: `${progress}%`, backgroundColor: category.color + '30' }} />
              </View>
            )
          })
        }
      </View>

    </View>
  )
}

export default CategoryList