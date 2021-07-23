import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { theme } from "../../global/styles/theme";
import { FlatList, ImageBackground, Text, View } from "react-native";
import BannerImg from "../../assets/banner.png";

import { styles } from "./styles";
import ListHeader from "../../components/ListHeader";
import Member from "../../components/Member";
import ListDivider from "../../components/ListDivider";
import ButtonIcon from "../../components/ButtonIcon";

export default function AppointmentDetails() {
  const members = [
    {
      id: "1",
      username: "Yago",
      avatar_url: "https://github.com/YagoYJ.png",
      status: "Online",
    },
    {
      id: "2",
      username: "Yago",
      avatar_url: "https://github.com/YagoYJ.png",
      status: "offline",
    },
    {
      id: "3",
      username: "Yago",
      avatar_url: "https://github.com/YagoYJ.png",
      status: "Online",
    },
  ];

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subTitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>

      <ListHeader title="Jogadores" subTitle="Total 3" />
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Member data={item} key={item.id} />}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />

      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
}
