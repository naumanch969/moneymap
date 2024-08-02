import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR_LIST } from '@/constants/Colors'

const ColorPicker = ({ selectedColor, setSelectedColor }: { selectedColor: string, setSelectedColor: any }) => {
    return (
        <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 20 }} >
            {
                COLOR_LIST.map((color, index) => (
                    <TouchableOpacity
                        onPress={() => setSelectedColor(color)}
                        key={index}
                        style={{ height: 30, width: 30, backgroundColor: color, borderRadius: 99, borderWidth: selectedColor === color ? 2 : 0, borderColor: selectedColor === color ? 'black' : 'transparent' }}
                    />
                ))
            }
        </View>
    )
}

export default ColorPicker