import {
  TextInput,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

/* ------------------ Types ------------------ */

type InputVariant = "default" | "error";
type InputSize = "md" | "sm";

interface InputProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  variant?: InputVariant;
  size?: InputSize;
  secureTextEntry?: boolean;
}

/* ------------------ Component ------------------ */

export function Input({
  value,
  placeholder,
  onChangeText,
  variant = "default",
  size = "md",
  secureTextEntry = false,
}: InputProps) {
  return (
    <View style={[styles.wrapper, styles.variant[variant]]}>
      <TextInput
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#71717a"
        style={[styles.input, styles.size[size]]}
        onChangeText={onChangeText}
      />
    </View>
  );
}

/* ------------------ Styles ------------------ */

const styles = {
  wrapper: {
    borderRadius: 8,
    borderWidth: 1,
    marginVertical : 10
  } as ViewStyle,

  variant: {
    default: {
      borderColor: "#e4e4e7",
    },
    error: {
      borderColor: "#ef4444",
    },
  } satisfies Record<InputVariant, ViewStyle>,

  size: {
    md: {
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 14,
    },
    sm: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 13,
    },
  } satisfies Record<InputSize, TextStyle>,

  input: {
    color: "#18181b",
    
  } as TextStyle,
};
