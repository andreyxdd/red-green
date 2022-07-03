import {
  StyleProp, TextStyle, NativeSyntheticEvent, TextInputFocusEventData,
} from 'react-native';

export interface IMeasurepicker {
  handleChange: (v: string) => void;
  handleBlur?:
    ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    &
    ((args: any) => void);
  value: number;
  label: string;
  style?: StyleProp<TextStyle>;
  error: boolean;
}
