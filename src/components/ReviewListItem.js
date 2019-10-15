import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import { colors } from '../common/colors';
import { texts } from '../common/texts';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-ratings';
import Avatar from './Avatar';

export default class ReviewListItem extends React.Component {

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
    const { image, description, title } = this.props;
    return (
      <TouchableOpacity >
        <Flex align='start' style={{ backgroundColor: colors.WHITE, padding:10, paddingRight:100 }}>

          <Avatar size={60} image={image} style={{marginLeft:18}}/>
          <Flex direction="column" align='start' style={{marginLeft:16}}>

            <Text style={styles.listText2}>{title}</Text> 
            <Rating
              type='star'
              ratingCount={5}
              imageSize={10}
              style={{ marginLeft: 2,marginTop:8 }}
              onFinishRating={this.ratingCompleted}
            />
            <Text style={[styles.listText1, {marginTop:8, fontSize:14}]}>{description}</Text>

          </Flex>
        </Flex>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  listText1: texts.CAPTION.BOLD,
  listText2: texts.CAPTION.SECONDARY,
});
