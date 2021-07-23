import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Feather } from "expo-vector-icons";

import Background from "../../components/Background";
import Button from "../../components/Button";
import CategorySelect from "../../components/CategorySelect";
import { GuildProps } from "../../components/Guild";
import GuildIcon from "../../components/GuildIcon";
import Header from "../../components/Header";
import ModalView from "../../components/ModalView";
import SmallInput from "../../components/SmallInput";
import TextArea from "../../components/TextArea";

import Guilds from "../Guilds";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

export default function AppointmentDetails() {
  const [category, setCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGuild, setSelectedGuild] = useState<GuildProps>(
    {} as GuildProps
  );

  function handleOpenModal() {
    setModalVisible(true);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setSelectedGuild(guildSelect);
    setModalVisible(false);
  }

  return (
    <Background>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <Header title="Agendar partida" />

          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Categoria
          </Text>
          <CategorySelect
            hasCheckBox
            setCategory={setCategory}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenModal}>
              <View style={styles.select}>
                {selectedGuild.icon ? (
                  <GuildIcon />
                ) : (
                  <View style={styles.image} />
                )}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {selectedGuild.name
                      ? selectedGuild.name
                      : "Selecione um servidor"}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={styles.label}>Dia e Mês</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>

              <View>
                <Text style={styles.label}>Hora e minuto</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descição</Text>

              <Text style={styles.caracteresLimit}>Max. 100 caracteres</Text>
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
            />

            <View style={styles.footer}>
              <Button title="Agendar" />
            </View>
          </View>
        </ScrollView>

        <ModalView visible={modalVisible}>
          <Guilds handleGuildSelect={handleGuildSelect} />
        </ModalView>
      </KeyboardAvoidingView>
    </Background>
  );
}
