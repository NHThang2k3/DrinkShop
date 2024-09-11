import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStore } from '@/store/store';
import ImageBackgroundInfo from '@/components/ImageBackgroundInfo';
import PaymentFooter from '@/components/PaymentFooter';
import { StatusBar } from 'react-native';

const details = () => {
  const navigation = useNavigation()
  const {params: item} = useRoute();
  const ItemOfIndex = useStore((state: any) =>
    item.type == 'Drink' ? state.DrinkList : state.NutsList,
  )[item.index];
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [price, setPrice] = useState(ItemOfIndex.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCarthandler = ({
    id,
    index,
    name,
    imagelink_square,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      imagelink_square,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.navigate('cart');
  };
  return (
    <View className="flex bg-white">
      <StatusBar backgroundColor="white" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_square={ItemOfIndex.imagelink_square}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View className="p-5">
          <Text className="text-black text-base font-JakartaExtraBold mb-2">Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text className="text-black text-base font-JakartaExtra mb-2">
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} className="text-black text-base font-JakartaExtra mb-2">
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text className="text-black text-base font-JakartaExtraBold mb-2">Size</Text>
          <View className="flex flex-row justify-between gap-4">
            {ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                className={`flex-1 items-center justify-center bg-gray-800 h-10 rounded-md border-2 ${data.size == price.size ? 'border-green-400': 'border-gray-400'}`}>
                <Text className={`${data.size == price.size ? 'text-green-400': 'text-gray-400'}`}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCarthandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              imagelink_square: ItemOfIndex.imagelink_square,
              type: ItemOfIndex.type,
              price: price,
            });
          }}
        />
      </ScrollView>
    </View>
  );
}

export default details

