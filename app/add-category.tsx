import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { ColorPicker } from '@/components'
import { supabase } from '@/services/supabase'
import { Category } from '@/interfaces'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useStateContext } from '@/context/useStateContext'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const AddCategory = () => {

    const { user } = useUser()
    const router = useRouter()
    const { setCurrentCategory } = useStateContext()

    const [icon, setIcon] = useState('Ic')
    const [color, setColor] = useState(Colors.PURPLE)
    const [name, setName] = useState('')
    const [budget, setBudget] = useState('')
    const [loading, setLoading] = useState(false)

    const onPress = async () => {
        const input: Category = {
            budget: parseInt(budget),
            icon,
            name,
            color,
            created_by: user?.primaryEmailAddress?.emailAddress!,
        }

        setLoading(true)
        const { data, error } = await supabase
            .from('Category')
            .insert([input])
            .select()

        if (data) {
            ToastAndroid.show('Category created successfully', ToastAndroid.SHORT)
            setCurrentCategory(data[0])
            router.push({ pathname: '/category-detail', params: { categoryId: data[0]?.id } })
            setName('')
            setBudget('')
            setIcon('Ic')
            setColor(Colors.PURPLE)
        }
        if (error) {
            console.log('error', error)
            ToastAndroid.show('Error creating category', ToastAndroid.SHORT)
        }
        setLoading(false)
    }

    return (
        <View style={{ marginTop: 20, padding: 20, backgroundColor: Colors.WHITE }} >
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <TextInput
                    placeholder=''
                    onChangeText={value => setIcon(value)}
                    style={{ textAlign: 'center', fontSize: 30, backgroundColor: color, padding: 20, borderRadius: 99, paddingHorizontal: 28, color: Colors.WHITE }}
                    maxLength={2}
                >{icon}</TextInput>
                <ColorPicker selectedColor={color} setSelectedColor={setColor} />
            </View>

            <View style={{ borderWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 20, padding: 14, borderRadius: 10, borderColor: Colors.GRAY, backgroundColor: Colors.WHITE }} >
                <MaterialIcons name="category" size={24} color={Colors.GRAY} />
                <TextInput
                    placeholder='Category Name'
                    onChangeText={(value) => setName(value)}
                    style={{ width: '100%', fontSize: 17 }}
                />
            </View>

            <View style={{ borderWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 20, padding: 14, borderRadius: 10, borderColor: Colors.GRAY, backgroundColor: Colors.WHITE }} >
                <MaterialCommunityIcons name="currency-rupee" size={24} color={Colors.GRAY} />
                <TextInput
                    placeholder='Total Budget'
                    onChangeText={(value) => setBudget(value)}
                    keyboardType='numeric'
                    style={{ width: '100%', fontSize: 17 }}
                />
            </View>

            <TouchableOpacity
                onPress={onPress}
                disabled={!name || !budget || loading}
                style={{ backgroundColor: Colors.PURPLE, padding: 14, borderRadius: 99, marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ textAlign: 'center', color: Colors.WHITE, fontSize: 20 }} >
                    {loading ? <ActivityIndicator size='small' color={Colors.WHITE} /> : 'Add Item'}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default AddCategory