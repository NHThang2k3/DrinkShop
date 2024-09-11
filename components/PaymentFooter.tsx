import { Text, View, TouchableOpacity} from 'react-native';
import React from 'react';


interface PriceProps {
  price: string;
  currency: string;
}

interface PaymentFooterProps {
  price: PriceProps;
  buttonPressHandler: any;
  buttonTitle: string;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
}) => {
  return (
    <View className="flex flex-row items-center justify-center gap-5 p-5">
      <View className="flex items-center w-24">
        <Text className="text-black text-base font-JakartaExtra">Price</Text>
        <Text className="text-black text-xl font-JakartaExtraBold">
          {price.currency} <Text className="text-black text-xl font-JakartaExtraBold">{price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        className="flex-1 flex items-center justify-center h-16 rounded-xl bg-green-400" 
        onPress={() => buttonPressHandler()}>
        <Text className="text-white text-xl font-JakartaExtraBold">{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default PaymentFooter;
