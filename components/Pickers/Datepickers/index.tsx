import { format } from 'date-fns';
import {
  StyleProp, TextStyle, Pressable, View, Platform,
} from 'react-native';
import { TextInput } from 'react-native-paper';

export interface ICommon{
  label: string;
  style?: StyleProp<TextStyle>;
  value: Date;
  dateFormat: string;
  error: boolean;
  maxDate?: Date;
  minDate?: Date;
}

export interface IDateInput extends ICommon {
  handleToggle?: () => void;
}

export interface IDatepicker extends ICommon {
  id?: string;
  onChange: ((dob: Date) => void);
}

export function DateInput({
  label, style, value, dateFormat, error, handleToggle,
}: IDateInput) {
  if (Platform.OS === 'web') {
    return (
      <TextInput
        label={label}
        style={style}
        value={format(value, dateFormat)}
        error={error}
      />
    );
  }

  return (
    <Pressable onPress={handleToggle}>
      <View pointerEvents="none">
        <TextInput
          label={label}
          style={style}
          value={format(value, dateFormat)}
          error={error}
        />
      </View>
    </Pressable>
  );
}
