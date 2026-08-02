import { Tabs } from "expo-router";
import { Ionicons } from "@react-native-vector-icons/ionicons";

export default function TabLayout() {
  return (

    
    <Tabs screenOptions={{ headerShown: false }}>
       <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
   
    </Tabs>
  );
}


    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: "Profile",
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="person-outline" color={color} size={size} />
    //       ),
    //     }}
    //   />