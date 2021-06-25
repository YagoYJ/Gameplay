import React, { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Appointment from "../../components/Apponintment";
import ButtonAdd from "../../components/ButtonAdd";
import CategorySelect from "../../components/CategorySelect";
import ListDivider from "../../components/ListDivider";
import ListHeader from "../../components/ListHeader";

import Profile from "../../components/Profile";

import { styles } from "./styles";

export default function Home() {
  const [category, setCategory] = useState("");

  const appointments = [
    {
      id: "1",
      guild: {
        id: "1",
        name: "Lendários",
        icon: null,
        owner: true,
      },
      category: "1",
      date: "22/06 às 20:40h",
      description:
        "É hoje que vamos chegar ao challenger sem perder uma partida da md10",
    },
  ];

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd />
      </View>

      <View>
        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        />
      </View>

      <View style={styles.content}>
        <ListHeader title="Paritdas agendadas" subTitle="Total 6" />
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Appointment data={item} />}
          style={styles.mathes}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider />}
        />
      </View>
    </View>
  );
}
