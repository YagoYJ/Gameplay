import React, { ReactNode } from "react";
import {
  View,
  ModalProps,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import Background from "../Background";

import { styles } from "./styles";

interface Props extends ModalProps {
  children: ReactNode;
  closeModal: () => void;
}

export default function ModalView({ children, closeModal, ...rest }: Props) {
  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
