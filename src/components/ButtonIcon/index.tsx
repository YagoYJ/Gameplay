import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
} from "react-native";

import DiscordImg from "../../assets/discord.png";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function ButtonIcon({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={DiscordImg} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
