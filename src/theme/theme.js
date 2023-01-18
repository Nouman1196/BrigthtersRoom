import Color from "./color";
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from "react-native-elements";
import { WP, HP } from '../utilies/responsives/responsive';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const FullFLexXYCenter = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}

const IOSShadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
}



const Theme = StyleSheet.create({
    CanvasBoard: {
        flex: 1,
        zIndex: 1,
        marginHorizontal: 10,
        // marginVertical: 10,
        marginTop: '4%'
    },
    TracingTOpCircle: {
        alignSelf: 'center',
        marginTop: '13%',
        backgroundColor: '#FDCF09',
        height: wp('37%'),
        width: wp('37%'),
        borderRadius: wp('37%'),
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
    },
    tracingBackArrow: {
        backgroundColor: '#FDCF09',
        width: 75,
        borderRadius: 5,
        alignSelf: 'center',
        textAlign: 'center',
        paddingVertical: 5
    },
    subContainerImage: {
        flex: 1,
        elevation: 6,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 15,
        ...IOSShadow,
        alignItems: 'center',
        padding: 10
    },
    PlayListContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: '4%',
        marginHorizontal: '3%',
        borderRadius: 5,
        elevation: 5,
        ...IOSShadow,
    },
    PlayListHeadingText: {
        ...IOSShadow,
        elevation: 5,
        backgroundColor: 'white',
        paddingVertical: '3%',
        textAlign: 'center',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 20
    },
    ImageTitleBox: {
        marginHorizontal: '2%',
        marginVertical: 30,
        height: wp("50%"),
        width: wp("35%"),
        ...IOSShadow
    },
    ImageTitleBoxImgContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 10,
        elevation: 5,
        borderRadius: 5
    },
    ImageTitleBoxText: {
        fontFamily: 'Gilroy-ExtraBold',
        backgroundColor: '#00549A',
        color: 'white',
        borderRadius: 5,
        paddingVertical: 10,
        fontSize: 22,
        textAlign: 'center'
    },
    whiteContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    ITMSOUNDBG: {
        flex: 1,
        backgroundColor: '#D5ECFF',
        borderTopWidth: 0.8,
        borderTopColor: '#D5ECFF',
        justifyContent: 'center'
    },
    ItemSoundImageM: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: '8%',
        borderRadius: 20,
        elevation: 5,
        marginVertical: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        ...IOSShadow
    },
    ItemSOundTextM: {
        backgroundColor: '#FC4C64',
        alignSelf: 'center',
        borderRadius: 15,
        paddingVertical: '3%',
        paddingHorizontal: '10%',
        elevation: 5,
        marginTop: '12%',
        flexDirection:'row',
        alignItems:'center'
    },
    ItemSOundTextT: {
        color: 'white',
        fontFamily: 'Gilroy-ExtraBold',
        textAlign: 'center',
        fontSize: wp('10%'),
        marginLeft:15
    },
    MatchingLine: {
        width: 40,
        backgroundColor: '#129A00',
        height: 5,
        marginRight: -25
    },
    MatchingImage: {
        flex: 1, width: null,
        height: null,
        marginVertical: 5
    },
    MatchingImageSubContainer: {
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        height: '100%',
        marginLeft: 10
    },
    MatchingImageSelectBox: {
        position: 'absolute',
        left: '5%',
        backgroundColor: 'white',
        borderWidth: 1,
        zIndex: 1,
        height: '25%',
        width: '15%',
        borderRadius: 3
    },
    MatchingImageContainer: {
        width: wp('22%'),
        height: wp('13%'),
        marginBottom: '10%',
        marginRight: '10%',
        justifyContent: 'center'
    },
    MatchingTextContainer: {
        backgroundColor: '#00549A',
        marginVertical: '5%',
        color: 'white',
        fontFamily: 'Gilroy-ExtraBold',
        paddingHorizontal: '12%',
        textAlign: 'center',
        paddingVertical: 10
    },
    successErrorContainer: {
        borderWidth: 2,
        borderColor: Color.themeColorOne,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1,
        top: wp('50%'),
        alignSelf: 'center',
        borderRadius: 10,
        width: wp('60%'),
        height: wp('60%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%'
    },
    missingAlphabetText: {
        color: 'black',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: hp('2.6%'),
    },
    SequenceBox: {
        borderRadius: 1,
        borderWidth: 1,
        borderRadius: 5,
        height: wp('13%'),
        width: wp('13%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        marginTop: '5%'
    },
    CardWithCrossContainer: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 10,
        marginVertical: '15%',
        marginHorizontal: '7%',
        borderRadius: 10,
        ...IOSShadow
    },
    HomeScreenTopImage: { height: wp('110%'), width: wp('100%'), marginBottom:'10%' },
    SocialSepratorLine: { borderBottomWidth: 1, borderBottomColor: '#707070', marginTop: '1%' },
    SocialSepratorText: { textAlign: 'center', marginTop: '3%', backgroundColor: '#E2F2FF', width: '39%', color: 'black', alignSelf: 'center', marginBottom: -9, fontSize: hp('2%'), fontFamily: 'Gilroy-Light' },
    AuthBottomImage: { position: 'absolute', bottom: -6, zIndex: 1, width: wp('100%') },
    AuthContainer: { flex: 1, justifyContent: 'center', marginHorizontal: '8%' },
    AuthScreenSunicon: { position: 'absolute', top: -135, right: -100 },
    AuthScreenBackgroundStyle: { flex: 1, width: '100%', position: 'absolute', bottom: -100 },
    HomeButton1Txt: {
        color: '#00549A',
        fontSize: 30,
        fontWeight: '400',
        textAlign: 'center'
    },
    HomeButton1: {
        backgroundColor: 'white',
        elevation: 5,
        ...IOSShadow,
        borderRadius: 15,
        height: wp('34%'),
        width: wp('34%'),
        justifyContent: 'center',
        margin: 15,
    },
    HomeButton2Txt: {
        textAlign: 'center',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: wp('4%'),
        color: 'white',
    },
    HomeButton2View: {
        width: '100%',
        backgroundColor: '#00549A',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: 38,
        justifyContent: 'center',
    },
    HomeButton3Txt: {
        textAlign: 'center',
        fontFamily: 'Gilroy-Light',
        position: 'absolute',
        bottom: 10,
        color: 'black',
        width: '100%',
        height: 38,
        textAlignVertical: 'center'
    },
    DotsEnroll: {
        position: 'absolute',
        right: 10,
        bottom: '-37%'
    },
    ElippsisEnroll: {
        position: 'absolute',
        left: '-25%',
        bottom: '1%',
        height: '100%'
    },
    SignUpInputIconContainer: {
        backgroundColor: '#A7D5FD',
        marginRight: 5,
        borderRadius: 8,
        height: 50,
        width: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginVertical: '4%'
    },
    SignUpMainContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 0.8
    },
    TextInputStyle: {

        color: "#8B8B8B",
        fontFamily: 'Gilroy-SemiBold',
        flex: 1,
        fontSize: hp('2.5%'),
        paddingVertical: Platform.OS == 'ios' ? 10 : 8,
    },
    loginMainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    subContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 50,
        marginTop: WP(5),
    },
    heading: {
        fontSize: 40,
        color: '#00549A',
        textAlign: 'left',
        marginBottom: 15,
        fontFamily: 'Gilroy-ExtraBold'
    },
    gif: {
        alignSelf: 'center',
        marginBottom: '20%',
        width: wp('82%'),
        height: wp('19%'),
        zIndex:1
    },
    forgetPassword: {
        marginTop: 4,
        paddingLeft: 21,
        color: '#000',
        alignSelf: 'flex-end',
        fontFamily: 'Rubik-Medium'
    },
    socialBtnStyle: {
        ...IOSShadow,
        elevation: 5,
        borderRadius: 5,
        flexDirection: 'row',
        marginTop: HP(3),
        height:55,
        overflow:'hidden'
    },
    btnStyle: {
        marginTop: HP(3),
        backgroundColor: '#C9C9C9',
        borderRadius: 5,
        // marginBottom: WP(10),
        borderColor: 'lightgrey',
        borderWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextstyle: {
        color: '#FFFFFF',
        paddingVertical: 8,
        fontSize: hp('2.5%'),
        // fontFamily: 'Gilroy-Medium'
    },
    SocialBtnTextstyle: {
        color: '#FFFFFF',
        fontSize: hp('2.2%'),
        fontFamily: 'Gilroy-ExtraBold',
        alignSelf: 'center'
    },
    InputView: {
        backgroundColor: "#fff",
        color: "#8B8B8B",
        borderColor: 'lightgrey',
        borderWidth: 0.8,
        marginTop: 10,
        borderRadius: 5,
        paddingHorizontal: '3%',
        fontWeight: 'bold',
        flexDirection: 'row',
        alignItems: 'center',
        ...IOSShadow,
        elevation: 5,
    },
    inputLabel: { color: 'black', marginLeft: 5, fontSize: 15, fontFamily: "Rubik-Medium" },
    centerItem: { justifyContent: 'center', alignItems: 'center' },
    Ycenter: {
        flex: 1,
        justifyContent: 'center'
    },
    Xcenter: {
        flex: 1,
        alignItems: 'center'
    },
    FullFLexXYCenter: FullFLexXYCenter,
    IOSShadow: IOSShadow
});



export default Theme;