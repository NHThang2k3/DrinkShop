import { Text, View, Image} from 'react-native';
import React from 'react';


interface PaymentMethodProps {
  paymentMode: string;
  name: string;
  icon: any;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMode,
  name,
  icon,
}) => {
  return (
    <View className={`bg-gray-800 border-2 rounded-full ${paymentMode == name ? 'border-green-400':'border-gray-800'} `}>
      
        <View className="flex flex-row items-center p-3 px-6 gap-6 rounded-lg">
          <Image source={icon} className="w-8 h-8" />
          <Text className="text-lg text-white font-JakartaExtra">{name}</Text>
        </View>
     
    </View>
  );
};



export default PaymentMethod;
