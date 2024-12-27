import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useQuery } from 'react-query';
import React from 'react';
import axios from 'axios';
import Loading from '../../loading/Loading';

const Quran = ({ navigation }: any) => {
  const { data, isFetching, error } = useQuery('getAllSurah', async () => {
    const response = await axios.get(
      'https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah.json'
    );
    return response?.data;
  });

  React.useEffect(() => {
    navigation.setOptions({
      title: 'القرآن الكريم',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: '#0B2239',
        fontFamily: 'Amiri',
        fontSize: 24,
        fontWeight: '400',
      },
      headerTintColor: '#0B2239',
      headerLeft: () => (
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Image style={styles.icon} source={require('../../../assets/back.png')} />
        </TouchableOpacity>
      ),
    });
  }, []);

  type El = {
    title: string;
    titleAr: string;
    index: string;
  };

  type Surah = {
    id: number;
    title: string;
    englishTitle: string;
    index: number;
  };

  const list: Surah[] = data?.map((surah: El) => ({
    id: Number(surah.index),
    title: surah.titleAr,
    englishTitle: surah.title,
    index: Number(surah.index),
  }));

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Surah', { index: item.index, nameAr: item.title })}
    >
      <View style={styles.titleView}>
        <Text style={styles.text}>{item.englishTitle}</Text>
        <Text style={styles.textArabic}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isFetching) return <Loading size={50} />;

  if (error) return <Text style={styles.errorText}>حدث خطأ أثناء تحميل البيانات</Text>;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={list}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  button: {
    flex: 1,
    margin: 5,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    fontFamily: 'Amiri',
    marginTop: 8,
  },
  textArabic: {
    textAlign: 'center',
    fontSize: 16,
    color: '#0B2239',
    fontFamily: 'Amiri',
    marginTop: 4,
    fontWeight: 'bold',
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 10,
  },
  headerBtn: {
    marginLeft: 15,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  errorText: {
    textAlign: 'center',
    color: '#ff4d4f',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Amiri',
  },
});

export default Quran;
