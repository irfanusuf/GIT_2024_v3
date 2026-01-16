import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

/* ------------------ Types ------------------ */

interface CardProps {
  children: React.ReactNode;
}

interface CardHeaderProps {
  title: string;
  description?: string;
}

interface CardSectionProps {
  children: React.ReactNode;
}

/* ------------------ Components ------------------ */

export function Card({ children }: CardProps) {
  return <View style={styles.card}>{children}</View>;
}



export function CardHeader({ title, description }: CardHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );
}

export function CardContent({ children }: CardSectionProps) {
  return <View style={styles.content}>{children}</View>;
}


export function CardFooter({ children }: CardSectionProps) {
  return <View style={styles.footer}>{children}</View>;
}

/* ------------------ Styles ------------------ */

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: "#e4e4e7",
    overflow: "hidden",
  } as ViewStyle,

  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#e4e4e7",
  } as ViewStyle,

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#18181b",
  } as TextStyle,

  description: {
    marginTop: 4,
    fontSize: 14,
    color: "#71717a",
  } as TextStyle,

  content: {
    padding: 20,
    gap: 12, // works in modern RN
  } as ViewStyle,

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#e4e4e7",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  } as ViewStyle,
};
