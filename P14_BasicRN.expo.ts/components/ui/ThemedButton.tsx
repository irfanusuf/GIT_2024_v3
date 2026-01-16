import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

/* ------------------ Types ------------------ */

type ButtonVariant = "default" | "secondary" | "ghost";
type ButtonSize = "md" | "sm";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text: string;
  onPress: () => void;
}

/* ------------------ Component ------------------ */

export function ThemedButton({
  variant = "default",
  size = "md",
  text,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles.variant[variant],
        styles.size[size],
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, styles.textVariant[variant]]}>
        {text}
      </Text>
    </Pressable>
  );
}

/* ------------------ Styles ------------------ */

const styles = {
  base: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical : 10
  } as ViewStyle,

  pressed: {
    opacity: 0.85,
  } as ViewStyle,

  variant: {
    default: {
      backgroundColor: "#18181b",
    },
    secondary: {
      backgroundColor: "#f4f4f5",
    },
    ghost: {
      backgroundColor: "transparent",
    },
  } satisfies Record<ButtonVariant, ViewStyle>,

  size: {
    md: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    sm: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
  } satisfies Record<ButtonSize, ViewStyle>,

  text: {
    fontSize: 14,
    fontWeight: "500",
  } as TextStyle,

  textVariant: {
    default: {
      color: "#fff",
    },
    secondary: {
      color: "#18181b",
    },
    ghost: {
      color: "#18181b",
    },
  } satisfies Record<ButtonVariant, TextStyle>,
};
