import React from "react";
import { Image } from "react-native";
import { View } from "react-native";

import { styles } from "./styles";

export default function GuildIcon() {
  const uri =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebcamstartup.com%2Fwp-content%2Fuploads%2F2018%2F04%2Fdiscord-logo.jpg&f=1&nofb=1";
  return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
}
