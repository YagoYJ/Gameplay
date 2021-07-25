import React from "react";
import { Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import GuildIcon from "../GuildIcon";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

import PlayerSvg from "../../assets/player.svg";
import CalendarSvg from "../../assets/calendar.svg";

import { categories } from "../../utils/categories";
import { GuildProps } from "../Guild";
import { LinearGradient } from "expo-linear-gradient";
interface AppointmentDataProps {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
}

interface AppointmentProps extends RectButtonProps {
  data: AppointmentDataProps;
}

export default function Appointment({ data, ...rest }: AppointmentProps) {
  const [category] = categories.filter((item) => item.id === data.category);

  const { owner } = data.guild;
  const { primary, on } = theme.colors;

  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[theme.colors.secondary40, theme.colors.secondary70]}
        >
          <GuildIcon />
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{data.guild.name}</Text>
            <Text style={styles.category}>{category.title}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />
              <Text style={styles.date}>{data.date}</Text>
            </View>

            <View style={styles.playersInfo}>
              <PlayerSvg fill={owner ? primary : on} />

              <Text style={[styles.player, { color: owner ? primary : on }]}>
                {owner ? "Anfitrião" : "Visitante"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
}
