import { SafeAreaView } from "react-native-safe-area-context";
import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Image
} from 'react-native';
import {FlatList} from 'react-native';
import DrinkCard from '@/components/DrinkCard';
import { useStore } from "@/store/store";
import { icons, images } from "@/constants";
import { useNavigation } from "@react-navigation/native";

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getDrinkList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let drinklist = data.filter((item: any) => item.name == category);
    return drinklist;
  }
};

const home = () => {
  const navigation = useNavigation()
  
  const DrinkList = useStore((state: any) => state.DrinkList);
  const NutsList = useStore((state: any) => state.NutsList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [categories, setCategories] = useState(
    getCategoriesFromData(DrinkList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedDrink, setSortedDrink] = useState(
    getDrinkList(categoryIndex.category, DrinkList),
  );

  const ListRef: any = useRef<FlatList>();

  const searchDrink = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedDrink([
        ...DrinkList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetSearchDrink = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedDrink([...DrinkList]);
    setSearchText('');
  };

  const CoffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <SafeAreaView >
    <StatusBar backgroundColor="#fff"/>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className="px-5 mb-20"
    >
      <View className="flex flex-row items-center justify-between my-5">
        <Text className="text-xl font-JakartaExtraBold">
          Welcome Lavender 👋
          {/* Welcome {user?.firstName}👋 */}
        </Text>
        {/* <TouchableOpacity
          onPress={handleSignOut}
          className="justify-center items-center w-10 h-10 rounded-full bg-white"
        >
          <Image source={icons.out} className="w-4 h-4" />
        </TouchableOpacity> */}
      </View>
      <Text className="text-2xl text-black font-JakartaSemiBold">
        What do you want today!
      </Text>

      {/* Search */}
      <View className="flex flex-row items-center justify-center relative z-50 rounded-xl my-2 bg-white shadow-md shadow-neutral-300">
          <TouchableOpacity
            onPress={() => {
              searchDrink(searchText);
            }}>
              <Image source={icons.search} className="w-6 h-6 mx-2" />
            
          </TouchableOpacity>
          <TextInput
            placeholder="Find Your Drink..."
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchDrink(text);
            }}
            placeholderTextColor="black"
            className="flex-1 h-10 text-black font-JakartaSemiBold"
          />
          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetSearchDrink();
              }}>
              <Image source={icons.close} className="w-6 h-6 mx-2" />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

      {/* Category Scroller */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          marginBottom: 10,
        }}>
        {categories.map((data, index) => (
          <View
            key={index.toString()}
            className="px-2">
            <TouchableOpacity
              className="items-center"
              onPress={() => {
                ListRef?.current?.scrollToOffset({
                  animated: true,
                  offset: 0,
                });
                setCategoryIndex({index: index, category: categories[index]});
                setSortedDrink([
                  ...getDrinkList(categories[index], DrinkList),
                ]);
              }}>
              <Text
                className={`text-black font-JakartaSemi mb-1 ${categoryIndex.index == index ? 'text-green-500' : ''}`}>
                {data}
              </Text>
              {categoryIndex.index == index ? (
                <View className="h-1 w-5 rounded-xl bg-green-500" />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Drink Flatlist */}

      <FlatList
        ref={ListRef}
        horizontal
        ListEmptyComponent={
          <View className="flex items-center justify-center py-20 px-10">
            <Text className="text-center text-xl font-JakartaExtraBold">No Drink Available</Text>
          </View>
        }
        showsHorizontalScrollIndicator={false}
        data={sortedDrink}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          gap: 20
        }}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            
            <TouchableOpacity
              onPress={() => {
                navigation.push('details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                });
                
              }}
            >
              <DrinkCard
                id={item.id}
                index={item.index}
                type={item.type}
                imagelink_square={item.imagelink_square}
                name={item.name}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={CoffeCardAddToCart}
              />
            </TouchableOpacity>
          );
        }}
      />

      <Text className="text-base font-JakartaExtraBold"> Nuts</Text>

      {/* Nuts Flatlist */}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={NutsList}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          gap: 20
        }}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push('details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                });
              }}
            >
              <DrinkCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={CoffeCardAddToCart}
              />
            </TouchableOpacity>
          );
        }}
      />

    </ScrollView>
    
    
    </SafeAreaView>
  )
}

export default home