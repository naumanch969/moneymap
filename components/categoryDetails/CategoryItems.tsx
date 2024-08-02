import { View, Text, Image, TouchableOpacity, ToastAndroid, Linking } from 'react-native'
import React, { useState } from 'react'
import { CategoryItem } from '@/interfaces'
import { Colors } from '@/constants/Colors'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { supabase } from '@/services/supabase'
import { useStateContext } from '@/context/useStateContext'

const CategoryItems = ({ categoryItems, updateRecords }: { categoryItems: CategoryItem[], updateRecords: any }) => {

    const { currentCategory } = useStateContext()
    let progress = 0;

    const [expandItem, setExpandItem] = useState<number | null>(null)

    const onDelete = async (id: string) => {
        const { error } = await supabase
            .from('CategoryItem')
            .delete()
            .eq('id', id)

        console.log('error', error)
        if (error)
            ToastAndroid.show('Failed to delete item', ToastAndroid.SHORT)
        else
            ToastAndroid.show('Item deleted successfully', ToastAndroid.SHORT)


        updateRecords(true)
    }

    const onOpenUrl = (url: string) => {
        if (url.includes('http'))
            Linking.openURL(url)
    }

    return (
        <View style={{ marginTop: 20 }} >
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >Item List</Text>

            <View style={{}} >
                {
                    categoryItems?.length == 0
                        ? <Text style={{ fontFamily: 'outfit', fontSize: 18, textAlign: 'center' }} >No items found</Text>
                        : null
                }
                {
                    categoryItems?.map((item, index) => {

                        if (index == 0)
                            progress = 0

                        progress += item.cost / currentCategory.budget * 100

                        return (
                            <View key={index} style={{ position: 'relative', marginBottom: 10, borderRadius: 15, overflow: 'hidden', backgroundColor: Colors.WHITE, }} >
                                <TouchableOpacity onPress={() => setExpandItem(pre => pre == index ? null : index)} key={index} style={{ zIndex: 100, padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }} >
                                    <Image
                                        source={{ uri: item?.image }}
                                        style={{ width: 70, height: 70, borderRadius: 10 }}
                                    />
                                    <View style={{ flex: 1 }} >
                                        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >{item?.name}</Text>
                                        <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.GRAY }} >{item?.note}</Text>
                                    </View>
                                    <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }} ><MaterialCommunityIcons name="currency-rupee" size={16} color={Colors.GRAY} /> {item?.cost}</Text>
                                </TouchableOpacity>
                                {
                                    expandItem == index &&
                                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'flex-end' }} >
                                        <TouchableOpacity onPress={() => onDelete(item?.id!)} ><Ionicons name='trash' size={24} color={Colors.RED} /></TouchableOpacity>
                                        <TouchableOpacity onPress={() => onOpenUrl(item?.url!)} ><Ionicons name='link' size={24} color={Colors.BLUE} /></TouchableOpacity>
                                    </View>
                                }
                                <View style={{ position: 'absolute', height: '100%', width: `${progress}%`, backgroundColor: currentCategory.color + '30' }} />
                            </View>
                        )
                    })
                }
            </View>

        </View>
    )
}

export default CategoryItems