import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../firebase';
import { Text, View } from '../components/Themed';
import useAuthentication from '../hooks/useAuthentification';

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSignOut: {
    backgroundColor: 'white',
    marginTop: 40,
    borderColor: '#f26d63',
    borderWidth: 2,
  },
  text: {
    color: 'grey',
    fontWeight: '800',
    fontSize: 18,
    paddingTop: 6,
  },
  buttonText: {
    color: 'grey',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonSignOutText: {
    color: '#f26d63',
  },
});

export default function UserMenuScreen() {
  const navigation = useNavigation();
  const authData = useAuthentication();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Intro');
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <FontAwesome
        name="user-circle-o"
        size={100}
        color="grey"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      />
      <Text style={styles.subTitle}>Username</Text>
      <Text style={styles.text}>{authData.user?.email}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonItem]}>
          <Text style={styles.buttonText}>Profile</Text>
          <FontAwesome
            name="chevron-right"
            size={12}
            color="grey"
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonItem]}>
          <Text style={styles.buttonText}>Integrations</Text>
          <FontAwesome
            name="chevron-right"
            size={12}
            color="grey"
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonItem]}>
          <Text style={styles.buttonText}>Notifications</Text>
          <FontAwesome
            name="chevron-right"
            size={12}
            color="grey"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignOut}
          style={[styles.button, styles.buttonSignOut]}
        >
          <Text style={[styles.buttonText, styles.buttonSignOutText]}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
