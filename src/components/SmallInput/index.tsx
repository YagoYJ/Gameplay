import React from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { styles } from "./styles";

export default function SmallInput({ ...rest }: TextInputProps) {
  return (
    <TextInput style={styles.container} keyboardType="numeric" {...rest} />
  );
}
