import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { FEEDBACK } from '../../common/staticdata';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import ReviewListItem from '../../components/ReviewListItem';
import Header from '../../components/Header';
import ServiceSmallItem from '../../components/servicesmallitem';
import { Rating } from 'react-native-ratings';
import Bar from '../../components/Bar';

export default class FeedbackView extends React.Component {

  _renderItem = ({ item }) => (
    <ReviewListItem image={item.image} title={item.title} description={item.description}></ReviewListItem>
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>

        <Header action="feedbackview" title="Reviews" type="service" />
        <ServiceSmallItem text="Group Swimming Class" icon="basketball" />

        <Flex style={{justifyContent:'center', alignItems:'center', paddingVertical:10, backgroundColor:'#fff', marginTop:8}}>
          <Rating
            type='star'
            backgroundColor="red"
            ratingCount={5}
            imageSize={20}
            onFinishRating={this.ratingCompleted}
          />
          <Text style={{ fontFamily: 'Muli', fontSize: 14, marginLeft: 10 }}> (20) </Text>
        </Flex>

        <Bar />

        <View>
          <FlatList
            data={FEEDBACK}
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
  separator: {
    height: 5,
  }
});
