import { GoogleAuthProvider } from 'firebase/auth';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { maybeCompleteAuthSession } from 'expo-web-browser';

maybeCompleteAuthSession();

function login(tokenId: string) {
  console.log('Signing in with Google...', { tokenId });

  const credential = GoogleAuthProvider.credential(tokenId);
  return credential;
}

export default function useGoogleAuthentication() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [request, _, promptAsync] = useIdTokenAuthRequest({
    ...Constants.manifest?.extra?.google,
    expoClientId: '739474459497-53aaa2aap39phn0snvo005mric2njld7.apps.googleusercontent.com',
  });

  async function prompt() {
    const response = await promptAsync();

    if (response?.type !== 'success') {
      throw new Error(response.type);
    }
    const credential = login(response.params.id_token);

    return [credential];
  }

  return [!!request, prompt] as const;
}
