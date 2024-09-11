import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import OrderItemCard from './OrderItemCard';
interface OrderHistoryCardProps {
  navigationHandler: any;
  CartList: any;
  CartListPrice: string;
  OrderDate: string;
}
const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  CartList,
  CartListPrice,
  OrderDate,
}) => {
  return (
    <View className="gap-2">
      <View className="flex flex-row justify-between gap-4 items-center">
        <View>
          <Text className="text-base font-JakartaExtraBold">Order Time</Text>
          <Text className="text-base font-JakartaExtra">{OrderDate}</Text>
        </View>
        <View className="flex items-end">
          <Text className="text-base font-JakartaExtraBold">Total Amount</Text>
          <Text className="text-base font-JakartaExtraBold text-green-400">$ {CartListPrice}</Text>
        </View>
      </View>
      <View className="gap-2 bg-slate-200 rounded-xl">
        {CartList.map((data: any, index: any) => (
          <TouchableOpacity
            key={index.toString() + data.id}
            onPress={() => {
              navigationHandler({
                index: data.index,
                id: data.id,
                type: data.type,
              });
            }}>
            <OrderItemCard
              type={data.type}
              name={data.name}
              imagelink_square={data.imagelink_square}
              special_ingredient={data.special_ingredient}
              prices={data.prices}
              ItemPrice={data.ItemPrice}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};



export default OrderHistoryCard;
