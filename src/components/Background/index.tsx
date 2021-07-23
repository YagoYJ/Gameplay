import { LinearGradient } from "expo-linear-gradient";
import React from "react";

import { styles } from "./styles";

import { theme } from "../../global/styles/theme";

interface BackgroundProps {
  children: React.ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  const { secondary80, secondary100 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary80, secondary100]}
    >
      {children}
    </LinearGradient>
  );
}
