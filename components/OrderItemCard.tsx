import { Text, View, ImageProps, Image} from 'react-native';
import React from 'react';


interface OrderItemCardProps {
  type: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: any;
  ItemPrice: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  type,
  name,
  imagelink_square,
  special_ingredient,
  prices,
  ItemPrice,
}) => {
  return (
    <View className="p-1 rounded-full gap-y-2">
      <View className="flex flex-row justify-between items-center ">
        <View className="flex flex-row gap-5 items-center">
          <Image source={imagelink_square}
          className="h-24 w-24 rounded-xl"/>
          <View>
            <Text className="text-black text-xl font-JakartaExtraBold">{name}</Text>
            <Text className="text-sm font-JakartaExtra">{special_ingredient}</Text>
          </View>
        </View>
        <View>
          <Text className="text-lg font-JakartaExtra">
            $ <Text className="text-black">{ItemPrice}</Text>
          </Text>
        </View>
      </View>
      {prices.map((data: any, index: any) => (
        <View key={index.toString()} className="flex flex-1 flex-row items-center justify-between">
          <View className="flex flex-1 flex-row items-center justify-between">
            <View className="flex-1 bg-black h-11 rounded-tl-lg rounded-bl-lg justify-center items-center border-l border-gray-500">
              <Text
              className="text-white text-lg"
                >
                {data.size}
              </Text>
            </View>
            <View className="flex-1 bg-black h-11 rounded-tr-lg rounded-br-lg justify-center items-center border-l border-gray-500">
              <Text className="text-white text-lg">
                {data.currency}
                <Text className="text-white"> {data.price}</Text>
              </Text>
            </View>
          </View>

          <View className="flex flex-1 flex-row items-center justify-between">
            <Text className="flex-1 text-center text-lg text-black">
              X <Text className="text-black">{data.quantity}</Text>
            </Text>
            <Text className="flex-1 text-center text-lg text-black">
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};



export default OrderItemCard;
