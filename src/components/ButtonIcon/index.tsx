import React from "react";
import { View, Text, Image } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { RectButton } from "react-native-gesture-handler";

import { styles } from "./styles";

import DiscordImg from "../../assets/discord.png";

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
