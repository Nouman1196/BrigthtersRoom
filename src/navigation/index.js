import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp'
// import SignUpOtp from '../screens/Auth/SignUp-Otp';
import Home from '../screens/Home';
import Splash from '../screens/Splash';
import Color from '../theme/color';
import Subjects from '../screens/Subjects';
// import SignUpCreatePass from '../screens/Auth/SignUp-CreatePassword';
import Lessons from '../screens/Lessons';
// import Practice from '../screens/Practice';
import ItemAndSound from '../screens/ItemSoundImages/ItemAndSound';
import Tracing from '../screens/Tracing/Tracing';
// import TraceLetters from '../screens/Tracing/TraceLetters';
// import SequenceOptions from '../screens/Sequence/SequenceOptions';
import Sequence from '../screens/Sequence/Sequence';
// import MatchingOptions from '../screens/Matching/MatchingOptions';
import Matching from '../screens/Matching/Matching';
import ContentList from '../screens/ContentList';
import PlayList from '../screens/PlayList';
import { Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import WordSound from '../screens/ItemSoundImages/WordSound';
import MissingAlphabet2 from '../screens/Sequence/MissingAlphabet2';
// import ItemAndVideo from '../screens/ItemSoundImages/ItemAndVideo';
import URL from '../screens/Auth/URL';
import fonts from '../theme/fonts';
import { HomeBack, NavBackArrow } from '../assets/svgIcons';
import Sign_up_instruction from '../screens/Auth/Sign_up_instruction';
import { HeaderMenu } from '../components/Helpers/Header';
import HomeDrawer from './drawer';
import EditProfile from '../screens/Auth/EditProfile';

const Stack = createStackNavigator();


const Routes = () => {


  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="splash" screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitleAlign: 'center', headerTintColor: 'white', headerStyle: { backgroundColor: Color.headerColor } }}>
        <Stack.Screen options={{ headerShown: false }} name="URL" component={URL} />
        <Stack.Screen options={{ headerShown: false }} name="splash" component={Splash} />
        <Stack.Screen options={{ headerShown: false, }} name="login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
        <Stack.Screen options={{ headerShown: false }} name="Sign_up_instruction" component={Sign_up_instruction} />
        <Stack.Screen options={{ headerShown: false, headerTransparent: true }} name="Home" component={HomeDrawer} />
        <Stack.Screen options={({ route, navigation }) => ({ headerShown: true, headerTransparent: true, header: () => <HeaderMenu navigation={navigation} title={route.params.title} /> })} name="Subjects" component={Subjects} />
        <Stack.Screen options={({ route, navigation }) => ({ headerShown: true, headerTransparent: true, header: () => <HeaderMenu navigation={navigation} title={route.params.title} /> })} name="Lessons" component={Lessons} />
        <Stack.Screen options={({ route }) => ({ headerShown: true, title: route.params.title })} name="PlayList" component={PlayList} />
        <Stack.Screen options={({ route, navigation }) => ({ headerShown: true, header: () => <HeaderMenu dark={true} bgColor={Color.headerColor} navigation={navigation} title={route.params.title} />  })} name="ContentList" component={ContentList} />
        <Stack.Screen options={({ route, navigation }) => ({ headerShown: true, header: () => <HeaderMenu dark={true} bgColor={'#2991E5'} navigation={navigation} title={route.params.title} /> })} name="ItemAndSound" component={ItemAndSound} />
        <Stack.Screen options={({ route }) => ({ headerShown: true, title: route.params.title })} name="WordSound" component={WordSound} />
        <Stack.Screen options={({ route, navigation }) => ({ headerShown: true, header: () => <HeaderMenu dark={true} bgColor={Color.headerColor} navigation={navigation} title={route.params.title} /> })} name="Matching" component={Matching} />
        <Stack.Screen options={({ route, navigation }) => ({ headerShown: true, header: () => <HeaderMenu dark={true} bgColor={Color.headerColor} navigation={navigation} title={route.params.title} /> })} name="Sequence" component={Sequence} />
        <Stack.Screen options={({ route, navigation }) => ({ headerShown: true, header: () => <HeaderMenu dark={true} bgColor={Color.headerColor} navigation={navigation} title="Profile" /> })} name="EditProfile" component={EditProfile} />
        <Stack.Screen options={({ route, navigation }) => ({ headerShown: true, header: () => <HeaderMenu dark={true} bgColor={Color.headerColor} navigation={navigation} title={"Tracing"} />  })} name="Tracing" component={Tracing} />
        <Stack.Screen options={({ route }) => ({ headerShown: true, title: "MissingAlphabet2" })} name="MissingAlphabet2" component={MissingAlphabet2} />
        {/* <Stack.Screen options={({ route }) => ({ headerShown: true, title: route.params.title })} name="TraceLetters" component={TraceLetters} /> */}
        {/* <Stack.Screen options={({ route }) => ({ headerShown: true, title: route.params.title })} name="ItemAndVideo" component={ItemAndVideo} />
        <Stack.Screen options={({ route }) => ({ headerShown: true, title: route.params.title })} name="SequenceOptions" component={SequenceOptions} />
        <Stack.Screen options={({ route }) => ({ headerShown: true, title: route.params.title })} name="MatchingOptions" component={MatchingOptions} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );


}
export default Routes;