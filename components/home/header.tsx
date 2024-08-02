import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {

    const { user } = useUser()

    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, }} >
            <Image
                source={{ uri: user?.imageUrl }}
                style={{ width: 50, height: 50, borderRadius: 99 }}
            />
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View>
                    <Text style={{ color: Colors.WHITE, fontSize: 16, fontFamily: 'outfit' }} >Welcome</Text>
                    <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-bold' }}>{user?.fullName}</Text>
                </View>
                <Ionicons name='notifications' size={24} color='white' />
            </View>
        </View>
    )
}

export default Header