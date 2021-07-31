import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

import Avatar from "../Avatar";
export interface MemberProps {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
}

interface Props {
  data: MemberProps;
}

export default function Member({ data }: Props) {
  const isOnline = data.status === "Online";
  return (
    <View style={styles.container}>
      <Avatar urlImage={data.avatar_url} />
      <View>
        <Text style={styles.title}>{data.username}</Text>

        <View style={styles.status}>
          <View
            style={[
              styles.bulletStatus,
              {
                backgroundColor: isOnline
                  ? theme.colors.on
                  : theme.colors.primary,
              },
            ]}
          />
          <Text style={styles.statusName}>
            {isOnline ? "Disponível" : "Ocupado"}
          </Text>
        </View>
      </View>
    </View>
  );
}
