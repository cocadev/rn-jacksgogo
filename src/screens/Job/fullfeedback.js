import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { FEEDBACK, FEEDBACK2 } from '../../common/staticdata';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import ReviewListItem from '../../components/ReviewListItem';
import Header from '../../components/Header';
import ServiceSmallItem from '../../components/servicesmallitem';
import { Rating } from 'react-native-ratings';
import Bar from '../../components/Bar';

export default class FullFeedBack extends React.Component {

  constructor() {
    super();
    this.state = {
      count: 32,
      datasource: FEEDBACK,
      theme1:colors.ORANGE,
      theme2:colors.BLACK
    };
  }

  _renderItem = ({ item }) => (
    <ReviewListItem image={item.image} title={item.title} description={item.description}></ReviewListItem>
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    const {theme1, theme2, datasource, count} = this.state;
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>

        <Header action="fullfeedback" title="Reviews" type="service" />

        <Flex justify="around" style={{ padding: 15, backgroundColor: '#fff', borderBottomColor: '#ddd', borderBottomWidth: 1 }}>

          <TouchableOpacity onPress={()=>{this.setState({datasource:FEEDBACK, count:5, theme1:colors.ORANGE, theme2:colors.BLACK})}}>
            <Text style={[styles.smalltext, { color: theme1 }]}>As Provider</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{this.setState({datasource:FEEDBACK2, count:3, theme2:colors.ORANGE, theme1:colors.BLACK})}}>
            <Text style={[styles.smalltext, { color: theme2 }]}>As Client</Text>
          </TouchableOpacity>

        </Flex>

        <Flex style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: '#fff' }}>
          <Rating
            type='star'
            backgroundColor="red"
            ratingCount={5}
            imageSize={20}
            onFinishRating={this.ratingCompleted}
          />
          <Text style={{ fontFamily: 'Muli', fontSize: 14, marginLeft: 10 }}> ({this.state.count}) </Text>
        </Flex>

        <Bar />

        <View>
          <FlatList
            data={datasource}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._ItemSeparator}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smalltext: texts.LISTTEXT,
  separator: {
    height: 5,
  }
});
