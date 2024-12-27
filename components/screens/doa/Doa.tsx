import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";

const Doa = ({ navigation }: any) => {

    useEffect(() => {
        navigation.setOptions({ 
            title: "الأدعية", 
            headerTitleStyle: {
                color: '#0B2239',
                fontFamily: 'Amiri',
                fontSize: 24,
                fontWeight: '400',
            },
            headerTintColor: '#0B2239',
            headerTitleAlign: 'center', // جعل العنوان في المنتصف
            headerLeft: () => (
              <Pressable style={styles.headerBtn} onPress={ () => navigation.goBack() } >
                <Image style={styles.icon} source={require('../../../assets/back.png')} />
              </Pressable>
            ),
         });
      }, []);

  return (
    <View style={styles.container}>
        <StatusBar style="dark" />
        <Text style={styles.heading}>بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</Text>
        <View style={styles.buttonWrapper}>
            <Pressable onPress={() => navigation.navigate('DuaDetal', { type: 's' })} style={styles.button}>
                <Text style={styles.text}>أدعية الصباح</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('DuaDetal', { type: 'm' })} style={styles.button}>
                <Text style={styles.text}>أدعية المساء</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Roqya')} style={styles.button}>
                <Text style={styles.text}>رقية شرعية</Text>
            </Pressable>
        </View>  
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 28,
        fontFamily: 'Amiri',
        color: '#0B2239',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        color: '#0B2239',
        fontSize: 20,
        fontFamily: 'Amiri',
        textAlign: 'center',
    },
    buttonWrapper: {
        marginTop: 30,
        width: '100%',
    },
    button: {
        marginVertical: 10,
        paddingVertical: 15,
        backgroundColor: '#E3F2FD',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,  
        alignItems: 'center',
        width: '100%',
    },
    headerBtn: {
        marginTop: 15,
        marginRight: 20,
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
});

export default Doa;
