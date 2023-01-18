import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Btn } from '../components/btn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { onFaceBookLogout } from '../utilies/FbLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/MainSlice';
import { getAllGrades, getUserProfile, logoutFunction } from '../utilies/api/apiCalls';
import Avatar from '../components/Avatar';
import deviceInfoModule from 'react-native-device-info';


const CustomSidebarMenu = (props) => {

  const dispatch = useDispatch()
  const userData = useSelector(state => state.main.userData)
  const deviceToken = useSelector(state => state.main.deviceToken)
  const navigation2 = useNavigation();
  const version = deviceInfoModule.getVersion()


  const goToProfile = () => {

    if (userData && userData?.role != 'guest') {

      getUserProfile({ navigation: navigation2, dispatch })
        .then(() => {
          navigation2.navigate('EditProfile')
        })

    }

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.drawerStyling} >
        <View style={styles.TopContainer}>
          <View style={styles.IconContainer}>
            <Avatar
              onPress={goToProfile}
            />

            <View style={styles.btnContainer}>
              <Text numberOfLines={1} style={styles.UserName}>{(userData.role ? ((userData?.first_name ? userData?.first_name?.toUpperCase() : "") + " " + (userData?.last_name ? userData?.last_name?.toUpperCase() : "")) : "Guest User")}</Text>
              <Text style={styles.email}>{userData?.email != "" ? userData?.email : `#${deviceToken?.split('-')[0]}`}</Text>
              {userData?.role != 'student' &&
                <Btn
                  text="Login"
                  containerStyle={styles.loginLogoutBtn}
                  textStyle={styles.loginLogoutText}
                  onPress={() => { navigation2.navigate('Sign_up_instruction') }}
                />}
            </View>
          </View>
        </View>

        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />

        </DrawerContentScrollView>

        {userData?.role == 'student' &&
          <TouchableOpacity onPress={logoutFunction.bind(this,({dispatch,navigation:navigation2,message:"Logout Successfully"}))} style={styles.logout}>
            <MaterialIcons style={{ paddingLeft: 10 }} name="logout" color={'#00549A'} size={28} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>}
        <Text style={styles.version}>Version: {version}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawerStyling: {
    flex: 1,
    backgroundColor: '#D5ECFF'
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TopContainer: {
    // height: '25%',
    width: '100%',
    backgroundColor: '#005195',
    justifyContent: 'space-between'
  },
  IconContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 30,
    marginBottom: 20

  },
  loginLogoutBtn: {
    backgroundColor: '#2991E5',
    borderColor: '#2991E5',
    width: 118,
    height: 43,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20
  },
  loginLogoutText: {
    fontSize: 20,
    fontFamily: 'Gilroy-ExtraBold',
    color: 'white'
  },
  signUpBtn: {
    backgroundColor: 'white',
    width: 95,
    height: 43,
    borderRadius: 10,
    justifyContent: 'center'
  },
  signUpBtnText: {
    paddingVertical: 0,
    fontSize: 20,
    fontFamily: 'Gilroy-ExtraBold',
    color: '#00549A'
  },
  notamember: {
    marginHorizontal: 30,
    marginBottom: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#2991E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  UserName: {
    fontSize: 20,
    fontFamily: 'Gilroy-ExtraBold',
    color: 'white'
  },
  email: {
    fontSize: 12,
    fontFamily: 'Gilroy-Light',
    color: 'white',
    marginTop: 3
  },
  logout: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(137,196,244,0.5)',
    borderRadius: 5,
    marginBottom: 10
  },
  logoutText: {
    fontFamily: 'Gilroy-Light',
    fontSize: 20,
    color: '#00549A',
    paddingLeft: 10
  },
  version: {
    fontSize: 12,
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 2,
    fontFamily: 'Gilroy-Light',
    color: '#00549A',
  },


});

export default CustomSidebarMenu;
