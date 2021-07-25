import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import Guild, { GuildProps } from "../../components/Guild";
import ListDivider from "../../components/ListDivider";

import { styles } from "./styles";

interface Props {
  handleGuildSelect: (guild: GuildProps) => void;
}

export default function Guilds({ handleGuildSelect }: Props) {
  const guilds = [
    { id: "1", name: "Guild", icon: null, owner: true },
    { id: "2", name: "R6", icon: null, owner: true },
    { id: "3", name: "R6", icon: null, owner: true },
    { id: "4", name: "R6", icon: null, owner: true },
    { id: "5", name: "R6", icon: null, owner: true },
    { id: "6", name: "R6", icon: null, owner: true },
    { id: "7", name: "R6", icon: null, owner: true },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 68 }}
        ListHeaderComponent={() => <ListDivider isCentered />}
      />
    </View>
  );
}
