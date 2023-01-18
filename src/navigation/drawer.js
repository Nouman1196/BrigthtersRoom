import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import CustomSidebarMenu from '../constants/drawerItems';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Color from '../theme/color';
import BannerTop from '../components/BannerTop';
import { useDispatch, useSelector } from 'react-redux';
import UserSettings from '../screens/DrawerScreens/UserSettings';
import { HeaderMenu } from '../components/Helpers/Header';
import { clearUserData } from '../utilies/api/apiCalls';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator();


function HomeDrawer() {

    const { userData, topBanner } = useSelector(state => state.main)
    // const dispatch = useDispatch()
    // const navigation = useNavigation()

    // useEffect(() => {

    //     if (userData != '') {

    //         appleAuth.onCredentialRevoked(async () => {
    //             setTimeout(() => {
    //                 clearUserData({
    //                     dispatch,
    //                     message: "User Account Deleted",
    //                     navigation
    //                 })
    //             }, 200);
    //         });

    //     }

    // }, []);

    return (
        <>
            {topBanner && userData == '' && <BannerTop />}

            <Drawer.Navigator
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: Color.headerColor,
                        width: '85%',
                    },
                }}
                drawerContent={(props) => <CustomSidebarMenu {...props} />}
            >
                <Drawer.Screen options={{
                    drawerLabelStyle: styles.labelStylingDrawer,
                    headerTransparent: true,
                    drawerLabel: 'Home',
                    drawerActiveBackgroundColor: 'rgba(137,196,244,0.5)',
                    drawerIcon: () => (
                        <AntDesign name="home" style={styles.iconStylingDrawer} color={'#00549A'} size={28} />
                    ),
                }}
                    name="HomeScreen" component={Home} />

                {userData?.role == 'student' ? (
                    <Drawer.Screen options={{
                        drawerLabelStyle: styles.labelStylingDrawer,
                        drawerLabel: 'Settings',
                        drawerActiveBackgroundColor: 'rgba(137,196,244,0.5)',
                        header: ({ navigation }) => <HeaderMenu navigation={navigation} title={"Setting"} dark={true} bgColor={Color.headerColor} />,
                        drawerIcon: () => (
                            <AntDesign name="setting" style={styles.iconStylingDrawer} color={'#00549A'} size={28} />
                        ),
                    }}
                        name="UserSettings" component={UserSettings} />
                ) : null}

            </Drawer.Navigator>
        </>

    );
}

const styles = StyleSheet.create({
    labelStylingDrawer: {
        color: '#00549A',
        fontFamily: 'Gilroy-Light',
        fontSize: 20,
        marginLeft: -10,
    },
    iconStylingDrawer: {}

});

export default HomeDrawer;