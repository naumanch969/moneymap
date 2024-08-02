import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useStateContext } from '@/context/useStateContext'
import { Colors } from '@/constants/Colors'
import { CategoryItem } from '@/interfaces'
import { supabase } from '@/services/supabase'
import { router } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CategoryDetail = () => {

    const { currentCategory: category } = useStateContext()

    const progress = (category?.CategoryItem?.reduce((acc: number, item: CategoryItem) => acc + item.cost, 0) / category?.budget) * 100 || 0

    const onDeleteCategory = () => {
        Alert.alert('Delete Category', 'Are you sure you want to delete this category?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => deleteCategory(), style: 'destructive' },
            ],
            { cancelable: false }
        )
    }

    const deleteCategory = async () => {
        const { error } = await supabase
            .from('CategoryItem')
            .delete()
            .eq('category_id', category?.id)

        const { } = await supabase
            .from('Category')
            .delete()
            .eq('id', category?.id)

        ToastAndroid.show('Category deleted successfully', ToastAndroid.SHORT)
        router.replace('/home')
    }

    return (
        <View>

            {/* Category Info */}
            <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 70, height: 70, backgroundColor: category?.color, borderRadius: 15 }} >
                    <Text style={{ fontSize: 30, color: Colors.WHITE }} >{category?.icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 20 }} >
                    <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >{category?.name}</Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 17 }} >{category?.CategoryItem?.length} Itmes</Text>
                </View>
                <TouchableOpacity onPress={onDeleteCategory} >
                    <Ionicons name='trash' size={24} color={Colors.RED} />
                </TouchableOpacity>
            </View>

            {/* Progress bar */}
            <View style={{ marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} >
                <Text style={{ fontFamily: 'outfit-bold' }} ><MaterialCommunityIcons name="currency-rupee" size={16} color={Colors.GRAY} />  {category?.CategoryItem?.reduce((sum: number, item: CategoryItem) => sum += Number(item?.cost), 0) || 0} / {category?.budget}</Text>
            </View>

            <View style={{ width: '100%', height: 15, backgroundColor: Colors.GRAY, borderRadius: 99, marginTop: 7 }} >
                <View style={{ width: `${progress}%`, height: '100%', backgroundColor: category?.color, borderRadius: 99 }} />
            </View>

        </View>
    )
}

export default CategoryDetail