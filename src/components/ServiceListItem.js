import * as React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import { colors } from '../common/colors';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { texts } from '../common/texts';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-ratings';

export default class ServiceListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 8
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    const { image, position, money, title, iconColor, marks, feedback, counts } = this.props;
    return (
      <TouchableOpacity onPress={() => Actions.serviceprofile()}>
        <Flex style={{ backgroundColor: colors.WHITE }}>
          <Image
            style={{ width: 90, height: 105 }}
            source={{
              uri: image,
            }}
          />
          <Flex direction="column" align='start'>

            <Flex>
              <MaterialCommunityIcons
                name="broom"
                size={20}
                color={colors.ORANGE}
                style={{ marginLeft: 18 }}
              />
              <Text style={styles.listText1}>{title}</Text>
            </Flex>

            <Flex>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={10}
                style={{ marginLeft: 20 }}
                onFinishRating={this.ratingCompleted}
              />
              <Text style={[styles.listText2, {fontWeight:'600'}]}>  {marks}</Text>
              <Text style={styles.listText2}> {feedback}</Text>
              <Text style={styles.listText2}> ({counts} reviews)</Text>
            </Flex>

            <Flex>
              <MaterialIcons
                name="near-me"
                size={20}
                color={colors.GREY4}
                style={{ marginLeft: 18 }}
              />
              <Text style={styles.listText2}> {position}</Text>
            </Flex>

            <Flex>
              <MaterialIcons
                name="monetization-on"
                size={20}
                color={colors.GREY4}
                style={{ marginLeft: 18 }}
              />
              <Text style={styles.listText1}> $ {money}</Text>
            </Flex>

          </Flex>
          <Flex style={{ position: 'absolute', right: 10 }}>
            <Entypo
              name="chevron-right"
              size={20}
              color={iconColor}
            />
          </Flex>
        </Flex>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  listText1: texts.LISTTEXT,
  listText2: texts.CAPTION.SECONDARY,
});
