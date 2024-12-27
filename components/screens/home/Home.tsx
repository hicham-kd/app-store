import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useRootStore } from '../../../model/root';
import { observer } from 'mobx-react-lite';
import { AZKARSALAT } from '../../../assets/AzkarSalat';
import RandomZekr from './randomZekr/RandomZekr';
import { StatusBar } from 'expo-status-bar';

const Home = observer(({ navigation }: any) => {
  const root = useRootStore();

  const onChange = (value: number) => {
    root.setFontSize(Math.floor(value));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>مرحبًا بك في تطبيق الأذكار</Text>
        <Text style={styles.subHeading}>اختر ما ترغب في استكشافه</Text>

        <View style={styles.buttonsContainer}>
          <Pressable onPress={() => navigation.navigate('Quran')} style={styles.button}>
            <Text style={styles.buttonText}>القرآن الكريم</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Dua')} style={styles.button}>
            <Text style={styles.buttonText}>الأدعية</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Azkar')} style={styles.buttonLarge}>
            <Text style={styles.buttonText}>أذكار بدون إنترنت</Text>
          </Pressable>
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>تغيير حجم الخط</Text>
          <View style={styles.sliderRow}>
            <Slider
              style={styles.slider}
              minimumValue={12}
              maximumValue={30}
              value={root.fontSize}
              thumbTintColor="#0B2239"
              minimumTrackTintColor="#0B2239"
              maximumTrackTintColor="#000000"
              onValueChange={onChange}
            />
            <Text style={styles.sliderValue}>{root.fontSize}</Text>
          </View>
        </View>

        <RandomZekr zekr={AZKARSALAT[Math.floor(Math.random() * AZKARSALAT.length)]} />
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f3',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingTop: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontFamily: 'Amiri',
    fontWeight: '700',
    color: '#0B2239',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    width: '90%',
    marginVertical: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 5,
  },
  buttonLarge: {
    width: '90%',
    marginVertical: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#0B2239',
    fontSize: 16,
    fontFamily: 'Amiri',
    textAlign: 'center',
  },
  sliderContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sliderLabel: {
    fontWeight: 'bold',
    color: '#0B2239',
    marginBottom: 10,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    marginLeft: 10,
    color: '#555',
  },
});

export default Home;