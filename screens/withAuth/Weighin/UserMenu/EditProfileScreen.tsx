import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { doc } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../../../firebase/firebase';
import NameInput from '../../../../components/EditProfile/NameInput';
import DOBInput from '../../../../components/EditProfile/DOBInput';
import { View } from '../../../../components/Themed';
import useAuthentication from '../../../../hooks/useAuthentification';
import UnitToggle from '../../../../components/EditProfile/UnitToggle';
import HeightInput from '../../../../components/EditProfile/HeightInput';
import WeightField from '../../../../components/EditProfile/WeightField';

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function EditProfileScreen() {
  const { user } = useAuthentication();
  const [value] = useDocument(doc(db, 'users', `${user?.uid}`));

  return (
    <View style={styles.container}>
      <FontAwesome
        name="user-circle-o"
        size={100}
        color="grey"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      />
      {user && value ? (
        <>
          <NameInput name={value.data()?.name} />
          <DOBInput DOB={value.data()?.dob.toDate()} />
          <UnitToggle
            unitsDB={value.data()?.units}
            height={value.data()?.height}
            weight={value.data()?.weight}
          />
          <HeightInput value={value.data()?.height} />
          <WeightField value={value.data()?.weight} />
        </>
      ) : null}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
