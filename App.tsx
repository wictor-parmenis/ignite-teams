import theme from "@theme/index";
import { ThemeProvider } from "styled-components/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import { StatusBar } from 'react-native';
import { NewGroup } from "@screens/NewGroup";
import { Groups } from "@screens/Groups";
import { Players } from "@screens/Players";
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  
  return (
    <ThemeProvider theme={theme}>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        { fontsLoaded ? <Routes/> : <Loading/> }
    </ThemeProvider>
  );
}

