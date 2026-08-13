import { Text, View, StyleSheet} from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>This is my main screeen</Text>

      <Link href="/(auth)">Login</Link>
      <Link href="/(auth)/signup">Signup</Link>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});
