import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../common/colors';
import { texts } from '../common/texts';
import { Rating } from 'react-native-ratings';
import Avatar from './Avatar';

export default class GoClubFeedbackListItem extends React.Component {

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
    const { image, admin, title, me, pending, edit } = this.props;
    return (
      <TouchableOpacity >
        <View style={{ flexDirection:'row', backgroundColor: pending ? colors.WHITEPURPLE: colors.WHITE, padding:10, paddingHorizontal:16, alignItems:'center',}}>

          <Avatar size={60} image={image} style={{marginLeft:26}}/>
          <View style={{marginLeft:6 }}>
            <Text style={[texts.HEADLINE, {marginTop:8}]}>{title}</Text> 
            <Rating
              readonly
              type='star'
              ratingCount={5}
              imageSize={10}
              onFinishRating={this.ratingCompleted}
            />
          </View>

          <View style={{flex:1, alignItems:'flex-end', marginRight:22}}>
          {
            pending? <Text style={{color:colors.PURPLE}}>Approve</Text>
            :(admin
              ? <Text>Admin</Text>
              : (!me && <Text style={{color:colors.PURPLE}}>Promote</Text> ))
          }
          </View>

          <View style={{alignItems:'flex-end'}}>
          {
            pending ? <Text style={{color:colors.PURPLE}}>Decline</Text>
            : ( admin
              ? <Text style={{color:colors.PURPLE}}>Demote</Text>
              : (me 
                  ? <Text style={{color:colors.BLACK}}>{'Owner\n You'}</Text>
                  : <Text style={{color:colors.PURPLE}}>Remove</Text>
                ))
          }
            
          </View>
          
        </View>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  listText1: texts.CAPTION.BOLD,
  listText2: texts.CAPTION.SECONDARY,
});
