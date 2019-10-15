import React from 'react';

import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { colors } from '../../common/colors';
import { commonStyles } from '../../common/commonStyles';
import { texts } from '../../common/texts';
import { Rating } from 'react-native-ratings';
import { Foundation } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import i from '../../common/i';
import UtilService from '../../utils/utils';

class FavouriteUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  componentDidMount() {

  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {Actions.jobclientprofile({User:item.User}) }}>
      <Flex style={{ backgroundColor: colors.WHITE, padding: 10 }}>
        <Image
          style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 5 }}
          source={{ uri: item.User.PhotoURL ? item.User.PhotoURL : 'http://www.hazelearth.com/admin-content/thumbs/nouser.jpg' }}
        />
        <View style={[commonStyles.ICON.favIcon, styles.fav]}>
          <Foundation name="heart" size={14} color={colors.ORANGE} />
        </View>
        <Flex direction='column'>
          <Text style={[texts.HEADLINE, { marginLeft: 20 }]}>{item.User.UserName}</Text>
          <Rating
            type='star'
            ratingCount={5}
            starCount={1}
            imageSize={10}
            style={{ marginLeft: 12 }}
            onFinishRating={this.ratingCompleted}
          />
        </Flex>
      </Flex>
    </TouchableOpacity>
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <ScrollView style={i.container}>
        <View style={{ justifyContent: 'center', elevation:3, marginBottom: 5, }}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }} style={{ position: 'absolute', left: 0, top: 3 }}>
            <Image source={UtilService.getBackIcon(2)} style={{ width: 30, height: 30 }} local={true} />
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', right: 16, top: 3 }}>
            <Image source={UtilService.getSearchIcon(2)} style={{ width: 30, height: 30 }} local={true} />
          </TouchableOpacity>
          <TextInput
            style={[i.textinput, { marginLeft: 37, marginRight:10 }]}
            underlineColorAndroid="transparent"
            placeholder={'Favourite Users'}
            onChangeText={text => { this.setState({ text }) }}
            value={this.state.text}
          />
        </View>

        <FlatList
          style={{paddingTop:2}}
          data={this.props.navigation.getParam('users')}
          keyExtractor={(item, i) => String(i)}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._ItemSeparator}
        />
      </ScrollView>
    );
  }
}

export default FavouriteUser;

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: "rgba(0, 0, 0, .08)"
  },
  fav: {
    backgroundColor: colors.WHITE,
    position: 'absolute',
    left: 70,
    top: 10
  }
});
