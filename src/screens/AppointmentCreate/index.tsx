import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Feather } from "expo-vector-icons";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

import { COLLECTION_APPOINTMENTS } from "../../configs/database";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function AppointmentDetails() {
  const [category, setCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGuild, setSelectedGuild] = useState<GuildProps>(
    {} as GuildProps
  );
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleOpenModal() {
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setSelectedGuild(guildSelect);
    setModalVisible(false);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild: selectedGuild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    return navigation.navigate("Home");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Background>
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
                  <GuildIcon
                    guildId={selectedGuild.id}
                    iconId={selectedGuild.icon}
                  />
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
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e Mês
                </Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} value={day} onChangeText={setDay} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput
                    maxLength={2}
                    value={month}
                    onChangeText={setMonth}
                  />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    value={hour}
                    onChangeText={setHour}
                  />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput
                    maxLength={2}
                    value={minute}
                    onChangeText={setMinute}
                  />
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
              returnKeyType="send"
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>

        <ModalView visible={modalVisible} closeModal={handleCloseModal}>
          <Guilds handleGuildSelect={handleGuildSelect} />
        </ModalView>
      </Background>
    </KeyboardAvoidingView>
  );
}
