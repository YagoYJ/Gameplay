import React from "react";
import { View, Text } from "react-native";
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
      />
    </View>
  );
}
