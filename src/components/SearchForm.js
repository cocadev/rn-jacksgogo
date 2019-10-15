import * as React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../common/colors';
import { EvilIcons, Foundation } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Entypo from '@expo/vector-icons/Entypo';

export default class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  render() {
    let right = 20;
  
    const { color, width, index, placeholder, left, navigation } = this.props;
    {
      index == "briefcase" || index == "location"
       ? right = 20
       : right = 70
    }
    
    return (
      <View>
        <TextInput
          style={{
            width: width + '%',
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            marginHorizontal: 10,
            marginTop: 10,
            marginLeft:left,
            fontSize: 18,
            paddingLeft: 10
          }}
          underlineColorAndroid='transparent'
          placeholder={placeholder}
          onChangeText={content => this.setState({ content })}
          value={this.state.content}
        />

        <TouchableOpacity style={[styles.searchButton, { backgroundColor: color, right: right }]}>
          <EvilIcons
            name="search"
            size={24}
            color={colors.WHITE}
          />
        </TouchableOpacity>

        {
          index == "mainsearch" || index == "alljobsearch"
          ? <TouchableOpacity style={[styles.searchButton, { backgroundColor: color, right: 20 }]} onPress={()=>{this.props.navigation.navigate("Search")}}>
            <Foundation
              name="heart"
              size={20}
              color={colors.WHITE}
            />
          </TouchableOpacity>
          : null
        }

        {
          index == "alljobsearch"
          ? <TouchableOpacity onPress={() => navigation.pop('Search')} style={[styles.searchButton, { left: 10 }]} >
            <Entypo
              name="chevron-left"
              size={36}
              color={colors.CYAN}
            />
          </TouchableOpacity>
          : null
        }
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchButton: {
    position: 'absolute',
    right: 20,
    top: 14,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
