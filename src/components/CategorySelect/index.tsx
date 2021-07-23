import React from "react";
import { ScrollView } from "react-native";

import { styles } from "./styles";

import { categories } from "../../utils/categories";
import Category from "../Category";

interface CategorySelectProps {
  categorySelected: string;
  hasCheckBox?: boolean;
  setCategory: (categoryId: string) => void;
}

export default function CategorySelect({
  categorySelected,
  setCategory,
  hasCheckBox = false,
}: CategorySelectProps) {
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map((category) => (
        <Category
          key={category.id}
          icon={category.icon}
          title={category.title}
          hasCheckBox={hasCheckBox}
          checked={category.id === categorySelected}
          onPress={() => setCategory(category.id)}
        />
      ))}
    </ScrollView>
  );
}
