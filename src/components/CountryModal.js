import React from "react";
import { Modal, SectionList, Text, TouchableOpacity, View } from "react-native";
// import Colors from "../../../constants/Colors";
// import Layouts from "../../../constants/Layouts";
import { countryCodesByAlphabet } from "../constants/CountryCodes";
import {XButton} from "../assets/svgIcons";

export const CountryModal = ({visible, pickerButtonOnPress, XButtonOnPress}) => (
  <Modal
    animationType={'slide'}
    visible={visible}
    transparent={true}
  >
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <View style={styles.countryModal}>
         <TouchableOpacity
             onPress={XButtonOnPress}
         >
           <XButton/>
         </TouchableOpacity>
        <SectionList
          style={{
            width: '100%',
            // marginTop: 0,
          }}
          sections={countryCodesByAlphabet}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.countryButton}
              onPress={() => pickerButtonOnPress(item)}
            >
              <Text style={{
                flex: 0.2
              }}>
                {item.flag}
              </Text>
              <Text style={{
                flex: 0.3,
              }}>
                {item.dial_code}
              </Text>
              <Text style={{
                flex: 1,
              }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { letter } }) => (
            <View style={{
              height: 30,
            }}>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                {letter}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  </Modal>
);

const styles = {
  countryButton: {
    borderBottom: 3,
    paddingVertical: 10,
    backgroundColor: '#F2F3F5',
    width: '100%',
    height: 50,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginVertical: 2,
    flexDirection: 'row',
    borderRadius:15
  },
  countryModal: {

      backgroundColor: "white",
    borderRadius: 20,
    width: '100%',
    height: '90%',
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }
};
