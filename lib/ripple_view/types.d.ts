import { StyleProp, ViewStyle } from 'react-native';
declare type RippleProps = {
    style?: StyleProp<ViewStyle>;
    containerWidth?: number | string;
    containerHeight?: number | string;
    disabled?: boolean;
    contentContainerStyle?: StyleProp<ViewStyle>;
    onTap?: () => void;
};
export { RippleProps };
