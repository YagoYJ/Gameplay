import React from "react";
import { Text } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { RectButton } from "react-native-gesture-handler";

import { styles } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
}

export default function Button({ title, ...rest }: ButtonProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
