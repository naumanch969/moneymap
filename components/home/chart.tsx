import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart'
import { COLOR_LIST, Colors } from '@/constants/Colors'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Category, CategoryItem } from '@/interfaces'
import Octicons from '@expo/vector-icons/Octicons';

const Chart = ({ categories }: { categories: Category[] }) => {

    const [values, setValues] = useState([1])
    const [colors, setColors] = useState(COLOR_LIST.slice(0, values.length))


    useEffect(() => {
        if (categories?.length == 0) return
        const maxCategories = 4;
        const calculatedValues = categories
            ?.slice(0, maxCategories)
            ?.map((category) => {
                const r = calculateCategoryCost(category)
                return r
            });

        const restCost = categories
            ?.slice(maxCategories)
            ?.reduce((acc, category) => acc + calculateCategoryCost(category), 0);

        console.log('calculatedValues, restCost', calculatedValues, restCost)
        const allValues = [...calculatedValues, restCost];

        setValues(allValues);
        setColors(COLOR_LIST.slice(1, allValues.length + 1));
    }, [categories]);

    const calculateCategoryCost = (category: Category) => {
        return category?.CategoryItem?.reduce((acc: number, item: CategoryItem) => acc + item?.cost, 0);
    };

    return (
        <View style={{ padding: 20, borderRadius: 15, elevation: 1, marginTop: 20, backgroundColor: Colors.WHITE }} >

            <Text style={{ fontSize: 20, }} >Total Estimate: <Text style={{ fontFamily: 'outfit-bold' }} ><MaterialCommunityIcons name="currency-rupee" size={16} color={Colors.GRAY} /> {values.reduce((acc, value) => acc + value, 0)}</Text></Text>

            <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <PieChart
                    widthAndHeight={150}
                    series={values.reduce((acc, value) => acc + value, 0) == 0 ? [1] : values}
                    sliceColor={values.reduce((acc, value) => acc + value, 0) == 0 ? [Colors.GRAY] : colors}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    {
                        categories?.length == 0 &&
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <Ionicons name='checkbox' size={24} color={Colors.GRAY} />
                            <Text style={{}} >NA</Text>
                        </View>
                    }
                    {
                        categories?.map((category, index) => (
                            <View key={index} style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Octicons name="dot-fill" size={30} color={COLOR_LIST[index + 1]} />
                                <Text style={{}} >{category.name}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>

        </View>
    )
}

export default Chart