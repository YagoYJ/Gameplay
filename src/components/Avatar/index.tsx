import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image } from "react-native";
import { theme } from "../../global/styles/theme";

import { styles } from "./styles";

interface ImageProps {
  urlImage: string;
}

export default function Avatar({ urlImage }: ImageProps) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.secondary50, theme.colors.secondary70]}
    >
      <Image source={{ uri: urlImage }} style={styles.avatar} />
    </LinearGradient>
  );
}
