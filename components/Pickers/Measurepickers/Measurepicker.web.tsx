import { TextInput } from 'react-native-paper';
import { IMeasurepicker } from './index';

function MeasureWebInput({
  handleChange, handleBlur, value, label, style, error,
}: IMeasurepicker) {
  return (
    <TextInput
      value={value.toString()}
      label={label}
      style={style}
      onBlur={handleBlur}
      onChangeText={(v) => handleChange(Number(v))}
      error={error}
      selectTextOnFocus
    />
  );
}

export default MeasureWebInput;
