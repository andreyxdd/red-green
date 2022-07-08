import {
  StyleProp, TextStyle, NativeSyntheticEvent, TextInputFocusEventData,
} from 'react-native';

export interface IMeasurepicker {
  handleChange: (v: number) => void;
  handleBlur?:
    ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    &
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((args: any) => void);
  value: number;
  label: string;
  style?: StyleProp<TextStyle>;
  error: boolean;
  min?: number;
  max?: number;
}
