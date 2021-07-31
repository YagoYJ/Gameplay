import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Linking,
  Platform,
  Text,
  View,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";

import Background from "../../components/Background";
import Header from "../../components/Header";
import Member, { MemberProps } from "../../components/Member";
import ListDivider from "../../components/ListDivider";
import ListHeader from "../../components/ListHeader";
import ButtonIcon from "../../components/ButtonIcon";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

import BannerImg from "../../assets/banner.png";
import { AppointmentDataProps } from "../../components/Appointment";
import { api } from "../../services/api";
import Load from "../../components/Load";
import { Alert } from "react-native";
import { Share } from "react-native";

interface ParamsProps {
  guildSelected: AppointmentDataProps;
}

interface GuildWidgetChannelsProps {
  id: string;
  name: string;
  position: number;
}

interface GuildWidgetProps {
  id: string;
  name: string;
  instant_invite: string;
  channels: Array<GuildWidgetChannelsProps>;
  members: Array<MemberProps>;
  presence_count: number;
}

export default function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidgetProps>(
    {} as GuildWidgetProps
  );
  const [load, setLoad] = useState(true);

  const { params } = useRoute();
  const { guildSelected } = params as ParamsProps;

  async function fetchGuildInfo() {
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );
      setWidget(response.data);
    } catch (error) {
      Alert.alert(
        "Atenção",
        "Verifique se o widget está ativo no seu servidor"
      );
    } finally {
      setLoad(false);
    }
  }

  function handleShareInvite() {
    if (widget.instant_invite) {
      const message =
        Platform.OS === "ios"
          ? `Junte-se a ${guildSelected.guild.name} `
          : widget.instant_invite;

      Share.share({
        message,
        url: widget.instant_invite,
      });
    } else {
      Alert.alert(
        "Atenção",
        "Adicione um canal de compartilhamento no seu servidor!"
      );
    }
  }

  function handleOpenGuild() {
    if (widget.instant_invite) {
      return Linking.openURL(widget.instant_invite);
    } else {
      Alert.alert(
        "Atenção",
        "Não foi possível entrar na partida.\nAdicione um canal de compartilhamento no seu servidor!"
      );
    }
  }

  useEffect(() => {
    fetchGuildInfo();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton onPress={handleShareInvite}>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subTitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {load ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subTitle={`Total ${widget.presence_count}`}
          />
          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} key={item.id} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
          />
        </>
      )}

      {guildSelected.guild.owner && (
        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
        </View>
      )}
    </Background>
  );
}
