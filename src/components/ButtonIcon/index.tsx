import React from "react";
import { View, Text, Image } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { RectButton } from "react-native-gesture-handler";

import DiscordImg from "../../assets/discord.png";
import { styles } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
}

export default function ButtonIcon({ title, ...rest }: ButtonProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={DiscordImg} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
