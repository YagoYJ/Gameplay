import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Appointment, {
  AppointmentDataProps,
} from "../../components/Appointment";
import Background from "../../components/Background";
import ButtonAdd from "../../components/ButtonAdd";
import CategorySelect from "../../components/CategorySelect";
import ListDivider from "../../components/ListDivider";
import ListHeader from "../../components/ListHeader";
import Profile from "../../components/Profile";

import { COLLECTION_APPOINTMENTS } from "../../configs/database";

import { styles } from "./styles";
import Load from "../../components/Load";

export default function Home() {
  const [category, setCategory] = useState("");
  const [appointments, setAppointments] = useState<AppointmentDataProps[]>([]);
  const [load, setLoad] = useState(true);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentDataProps) {
    navigation.navigate("AppointmentDetails", { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate");
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentDataProps[] = response
      ? JSON.parse(response)
      : [];

    if (category) {
      setAppointments(
        storage.filter(
          (item: AppointmentDataProps) => item.category === category
        )
      );
    } else {
      setAppointments(storage);
    }

    setLoad(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd onPress={handleAppointmentCreate} />
        </View>

        <View>
          <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
          />
        </View>

        {load ? (
          <Load />
        ) : (
          <>
            <ListHeader
              title="Paritdas agendadas"
              subTitle={`Total ${appointments.length}`}
            />

            <FlatList
              data={appointments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Appointment
                  data={item}
                  onPress={() => handleAppointmentDetails(item)}
                />
              )}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <ListDivider />}
              contentContainerStyle={{ paddingBottom: 69 }}
            />
          </>
        )}
      </View>
    </Background>
  );
}
