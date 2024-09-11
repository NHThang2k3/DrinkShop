import React from 'react';
import {
  Text,
  View,
  ImageProps,
  Image,
  TouchableOpacity,
} from 'react-native';
import { icons } from '@/constants';

interface CartItemProps {
  id: string;
  name: string;
  imagelink_square: ImageProps;
  ingredients: string;
  prices: any;
  type: string;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imagelink_square,
  ingredients,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  return (
    <View className=" bg-slate-100 rounded-xl">
      {prices.length != 1 ? (
        <View className=" gap-3 p-3 rounded-xl">
          <View className="flex-row ">
            <Image source={imagelink_square} className="h-36 w-36 rounded-2xl" />
            <View className="flex-1 px-4 py-1 justify-between">
              <View>
                <Text className="text-black text-xl font-JakartaExtraBold">{name}</Text>
                <Text className="text-black text-base font-JakartaExtra">
                  {ingredients}
                </Text>
              </View>
              
            </View>
          </View>
          {prices.map((data: any, index: any) => (
            <View
              key={index.toString()}
              className="flex-1 items-center gap-x-5 flex-row justify-center"
            >
              <View className="flex-1 items-center flex-row justify-between">
                <View className="bg-black h-10 w-20 rounded-lg flex items-center justify-center">
                  <Text className="text-white text-base font-JakartaExtra">
                    {data.size}
                  </Text>
                </View>
                <Text className="text-black text-xl font-JakartaExtraBold">
                  {data.currency}
                  <Text className="text-black text-xl font-JakartaExtraBold"> {data.price}</Text>
                </Text>
              </View>
              <View className="flex-1 items-center flex-row justify-between">
                <TouchableOpacity
                  className="bg-green-400 p-3 rounded-lg w-8 h-8 flex items-center justify-center"
                  onPress={() => {
                    decrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <Image source={icons.minus} resizeMode="contain" className="w-3"/>
                </TouchableOpacity>
                <View className="bg-black w-20 rounded-md border-2 border-green-400 items-center py-1">
                  <Text className="text-white text-base font-JakartaExtra">
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-green-400 p-3 rounded-lg w-8 h-8 flex items-center justify-center"
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <Image source={icons.plus} resizeMode="contain" className="w-3"/>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="flex-row items-center p-3 gap-3 rounded-xl">
          <View>
            <Image
              source={imagelink_square}
              className="h-36 w-36 rounded-2xl"
            />
          </View>
          <View className="flex-1 self-stretch justify-around">
            <View>
              <Text className="text-black text-xl font-JakartaExtraBold">{name}</Text>
              <Text className="text-black text-base font-JakartaExtra">{ingredients}</Text>
            </View>
            <View className="flex-row justify-evenly items-center">
              <View className="bg-black h-10 w-24 rounded-md flex justify-center items-center">
                <Text
                  className="text-white text-base font-JakartaExtra">
                  {prices[0].size}
                </Text>
              </View>
              <Text className="text-black text-xl font-JakartaExtraBold">
                {prices[0].currency}
                <Text className="text-black text-xl font-JakartaExtraBold"> {prices[0].price}</Text>
              </Text>
            </View>
            <View className="flex-row justify-evenly items-center">
              <TouchableOpacity
                className="bg-green-400 p-2 rounded-lg w-8 h-8 flex items-center justify-center"
                onPress={() => {
                  decrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                  <Image source={icons.minus} resizeMode="contain" className="w-3"/>
                
              </TouchableOpacity>
              <View className="bg-black w-20 rounded-md border-2 border-green-400 items-center py-1">
                <Text className="text-white text-base font-JakartaExtra">
                  {prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-green-400 p-3 rounded-lg w-8 h-8 flex items-center justify-center"
                onPress={() => {
                  incrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                  <Image source={icons.plus} resizeMode="contain" className="w-3"/>
                
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};



export default CartItem;
