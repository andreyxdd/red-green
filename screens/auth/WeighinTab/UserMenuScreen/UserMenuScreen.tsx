import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import shallow from 'zustand/shallow';
import { auth } from '../../../../firebase/firebase';
import useDataStore, { IDataStore } from '../../../../hooks/useDataStore';
import { AuthStackScreenProps } from '../../../../types/navigation';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  buttonContainer: {
    width: '60%',
    marginVertical: 40,
  },
  button: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
});

function UserMenuScreen({ navigation: { navigate } }: AuthStackScreenProps<'UserMenu'>) {
  const [user, profileData] = useDataStore(
    (state: IDataStore) => [state.user, state.profileData],
    shallow,
  );

  const handleSignOut = () => {
    auth
      .signOut()
      .catch((e) => console.log(e));
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <FontAwesome
        name="user-circle-o"
        size={100}
        color="grey"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      />
      {profileData ? <Text>{profileData.name}</Text> : null}
      {user ? <Text>{user.email}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => { navigate('EditProfile'); }}
          icon="chevron-right"
          contentStyle={styles.button}
        >
          Profile
        </Button>
        <Button
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPress={() => { }}
          icon="chevron-right"
          contentStyle={styles.button}
        >
          Integrations
        </Button>
        <Button
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPress={() => { }}
          icon="chevron-right"
          contentStyle={styles.button}
        >
          Notifications
        </Button>
        <Button onPress={handleSignOut} mode="outlined" style={{ marginVertical: 12 }}>
          Sign Out
        </Button>
      </View>
    </View>
  );
}

export default UserMenuScreen;
