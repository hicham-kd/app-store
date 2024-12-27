import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AZKARSALAT } from '../../../assets/AzkarSalat';
import { useRootStore } from '../../../model/root';

const Azkar = ({ navigation }: any) => {

  const root = useRootStore();

  useEffect(() => {
    navigation.setOptions({ 
      title:  "أذكار و أدعية", 
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: '#0B2239',
        fontFamily: 'Amiri',
        fontSize: 24,
        fontWeight: '200',
      },
      headerTintColor: '#0B2239',
      headerLeft: () => (
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Image style={styles.icon} source={require('../../../assets/back.png')} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.zekrCard}>
      <Text style={styles.desc}>{item.category}</Text>
      <View style={styles.zekr}>
        <Text style={[styles.text, { fontSize: root.fontSize }]}>{item.zekr}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={AZKARSALAT}
        renderItem={renderItem}
        keyExtractor={item => (Math.random() * item.id).toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
}

export default Azkar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  headerBtn: {
    marginTop: 15,
    marginLeft: 20,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'stretch',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  zekrCard: {
    padding: 15,
    backgroundColor: '#0B2239',
    marginVertical: 10,
    borderRadius: 20,
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Amiri',
    fontSize: 16,
    lineHeight: 28,
  },
  zekr: {
    paddingBottom: 20,
  },
  desc: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    fontWeight: 'bold',
  }
});
