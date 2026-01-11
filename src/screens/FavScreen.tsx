import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Coffee {
  id: string;
  name: string;
}

export default function FavScreen() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    loadCoffees();
  }, []);

  const loadCoffees = async () => {
    try {
      const json = await AsyncStorage.getItem("@fav_coffees");
      if (json) {
        const list: Coffee[] = JSON.parse(json);
        setCoffees(list);
      }
    } catch (e) {
      console.error("Kahveler yüklenirken hata:", e);
    }
  };

  const saveCoffees = async (list: Coffee[]) => {
    try {
      await AsyncStorage.setItem("@fav_coffees", JSON.stringify(list));
    } catch (e) {
      console.error("Kahveler yüklenirken hata:", e);
    }
  };

  const addCoffee = () => {
    const name = newName.trim();
    if (!name) {
      Alert.alert("Uyarı", "Lütfen bir kahve adı girin.");
      return;
    }
    const newCoffee: Coffee = { id: Date.now().toString(), name };
    const updated = [...coffees, newCoffee];
    setCoffees(updated);
    saveCoffees(updated);
    setNewName("");
  };

  const deleteCoffee = (id: string) => {
    Alert.alert("Sil", "Bu kahveyi silmek istediğine emin misin?", [
      { text: "iptal", style: "cancel" },
      {
        text: "sil",
        style: "destructive",
        onPress: () => {
          const filtered = coffees.filter((c) => c.id !== id);
          setCoffees(filtered);
          saveCoffees(filtered);
        },
      },
    ]);
  };
  return (
    <View className="flex-1 p-4 mb-4 mt-8">
      <Text className="text-2xl font-bold text-center mb-4">
        Favori Kahveler
      </Text>
      <View className="flex-row items-center mb-4 gap-2">
        <TextInput
          placeholder="Yeni kahve adı"
          className="flex-1 border"
          value={newName}
          onChangeText={setNewName}
        />
        <TouchableOpacity
          className="bg-primary py-3 px-4 rounded-lg"
          onPress={addCoffee}
        >
          <Text>Ekle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={coffees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between item-center py-3 px-2 border-bottom border-gray-200">
            <Text>{item.name}</Text>
            <TouchableOpacity
              className="bg-red-500 px-3 py-1 rounded"
              onPress={() => deleteCoffee(item.id)}
            >
              <Text className="text-white">Sil</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-8">Liste Boş</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
