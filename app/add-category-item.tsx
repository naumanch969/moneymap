import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '@/services/supabase'
import { decode } from 'base64-arraybuffer'
import { CategoryItem } from '@/interfaces'
import { useStateContext } from '@/context/useStateContext'
import { useUser } from '@clerk/clerk-expo'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const AddCategoryItem = () => {

    const placeholder = 'https://ozfvhfjhuynjyevicwsk.supabase.co/storage/v1/object/public/images/OIP.jpg'
    const { currentCategory, setCurrentCategory } = useStateContext()
    const { categoryId }: { categoryId: string } = useLocalSearchParams();
    const { user } = useUser()
    const router = useRouter()
    const baseUrl = 'https://ozfvhfjhuynjyevicwsk.supabase.co/storage/v1/object/public/images/'

    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [cost, setCost] = useState('')
    const [note, setNote] = useState('')
    const [loading, setLoading] = useState(false)


    const onCreate = async () => {
        setLoading(true);

        try {
            const filename = Date.now();

            const imageFileName = `${filename}.png`;
            const { data: imageData, error: uploadError } = await supabase
                .storage
                .from('images')
                .upload(imageFileName, decode(image), { contentType: 'image/png' });

            if (uploadError) {
                throw new Error(uploadError.message);
            }

            const imageUrl = `${baseUrl}${imageFileName}`;

            let input: CategoryItem = {
                category_id: currentCategory?.id! || categoryId!,
                url,
                name,
                note,
                image: image ? imageUrl : placeholder,
                cost: Number(cost),
                created_at: new Date(),
            };

            const { data, error: insertError } = await supabase
                .from('CategoryItem')
                .insert([input])
                .select('*');

            if (insertError) {
                throw new Error(insertError.message);
            }

            if (data) {
                setCurrentCategory(pre => ({ ...pre, CategoryItem: [...(pre.CategoryItem || [])!, data[0]] }))
                ToastAndroid.show('Item Added', ToastAndroid.SHORT);
                router.push({ pathname: '/category-detail', params: { categoryId: categoryId! } })
                setName('')
                setCost('')
                setNote('')
                setUrl('')
                setPreviewImage('')
            }
        } catch (error) {
            console.error('Error:', error);
            ToastAndroid.show('Error Adding Item', ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };

    const onImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
            base64: true
        })

        if (!result.canceled) {
            setPreviewImage(result?.assets[0].uri)
            setImage(result?.assets[0].base64!)
        }
    }

    return (
        <KeyboardAvoidingView>
            <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE, height: '100%' }} >

                <TouchableOpacity onPress={onImagePick} >
                    <Image source={{ uri: previewImage || placeholder }} style={{ width: 120, height: 120, borderRadius: 15 }} />
                </TouchableOpacity>

                <View style={{ padding: 10, borderWidth: 1, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 10, borderColor: Colors.GRAY, marginTop: 15 }} >
                    <MaterialCommunityIcons name="rename-box" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder='Item Name'
                        onChangeText={value => setName(value)}
                        value={name}
                        style={{ fontSize: 17, fontFamily: 'outfit', width: '100%' }}
                    />
                </View>

                <View style={{ padding: 10, borderWidth: 1, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 10, borderColor: Colors.GRAY, marginTop: 15 }} >
                    <MaterialCommunityIcons name="currency-rupee" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder='Cost'
                        keyboardType='number-pad'
                        onChangeText={value => setCost(value)}
                        value={cost}
                        style={{ fontSize: 17, fontFamily: 'outfit', width: '100%' }}
                    />
                </View>

                <View style={{ padding: 10, borderWidth: 1, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 10, borderColor: Colors.GRAY, marginTop: 15 }} >
                    <Ionicons name='unlink-sharp' size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder='URL'
                        onChangeText={value => setUrl(value)}
                        value={url}
                        style={{ fontSize: 17, fontFamily: 'outfit', width: '100%' }}
                    />
                </View>

                <View style={{ padding: 10, borderWidth: 1, display: 'flex', flexDirection: 'row', gap: 10, borderRadius: 10, borderColor: Colors.GRAY, marginTop: 15 }} >
                    <FontAwesome name="sticky-note-o" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder='Note'
                        numberOfLines={3}
                        onChangeText={value => setNote(value)}
                        value={note}
                        style={{ fontSize: 17, fontFamily: 'outfit', width: '100%', textAlignVertical: 'top' }}
                    />
                </View>

                <TouchableOpacity
                    disabled={!name || !cost || loading}
                    onPress={onCreate}
                    style={{ padding: 20, backgroundColor: Colors.PRIMARY, borderRadius: 99, marginTop: 25 }}
                >
                    <Text style={{ textAlign: 'center', fontFamily: 'outfit-bold', color: Colors.WHITE }} >
                        {loading ? <ActivityIndicator size='small' color={Colors.WHITE} /> : 'Add Item'}
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export default AddCategoryItem