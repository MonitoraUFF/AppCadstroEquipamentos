import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Mapa } from './src/screens/Mapa';
import { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location';

export default function App() {
  const[location, setLocation] = useState<LocationObject | null>(null);
    
  async function requestLocationPermissions(){
    const { granted } = await requestForegroundPermissionsAsync();
    
    if(granted){
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions(); 
  }, [])

  return (
      <View style = {{
        flex: 1, width:"100%"
      }}>
        {
        location && 
          <MapView style = {{
          flex:1, width:"100%"
          }}
          initialRegion={{
            latitude: -22.89845121622674,
            longitude: -43.131635942333034,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }}
          />
        }
    </View>
  );
}


