import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import { Entypo, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-ratings';
import CategorySmallItem from '../../components/CategorySmallItem';
import Bar from '../../components/Bar';
import JobButton from '../../components/JobButton';
import Header from '../../components/Header';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;

export default class ServiceProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 5
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  renderPage(image, index) {
    return (
      <View key={index}>
        <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ScrollView>
          <Header action="serviceprofile" title="" type="service" />
          <Image source={{ uri: 'http://www.kent-college.co.uk/slider/thrive/5-annabel-swimming.jpg' }} style={{ width: '100%', height: 200 }} />
          <WhiteSpace />
          <View>
            <Flex>
              <View style={{ flex: 4, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 120 }}>
                <MaterialCommunityIcons name="basketball" size={66} color={colors.ORANGE} />
                <Text style={[styles.normalText, { textAlign: 'center' }]}>Sports</Text>
              </View>
              <View style={{ flex: 11, backgroundColor: '#fff', marginLeft: 10 }}>
                <Text style={{ fontFamily: 'Muli-Bold', fontSize: 32, textAlign: 'center', paddingVertical: 12 }}>Group Swimming Class</Text>
              </View>
            </Flex>
          </View>

          <CategorySmallItem icon={'monetization-on'} text={'$ 150.00'} />
          <CategorySmallItem icon={'near-me'} text={'Eunos Swim Club 10 Eunos Road 8 #05-23 408600'} />
          <Flex align='flex-start' style={{ backgroundColor: colors.WHITE, padding: 11, marginTop: 10 }}>
            <MaterialIcons name={'error-outline'} size={23} color={colors.GREY4} />
            <Flex direction="column" align='start' style={{ paddingRight: 15 }}>
              <Text style={styles.content}> Total 3 classes, 1 hour class each. </Text>
              <Text style={styles.content}> Not more than 10 people in a class.</Text>
              <WhiteSpace/>
              <Text style={styles.content}> 1. Beginner class- </Text>
              <Text style={styles.content}> Learn to float, breathing lessons & breast stroke basics</Text>
              <WhiteSpace/>
              <Text style={styles.content}> 2. Intermediate class-</Text>
              <Text style={styles.content}> Back stroke, free-style</Text>
              <WhiteSpace/>
              <Text style={styles.content}> 3. Advanced class-</Text>
              <Text style={styles.content}> Butterfly stroke</Text>
              <WhiteSpace/>
              <Text style={styles.content}> *Trial class available! Search in my list of postings for more details.</Text>
            </Flex>
          </Flex>

          <Bar />

          <Flex style={{ backgroundColor: colors.WHITE, padding: 15 }}>
            <Flex direction="column" align='start'>
              <Flex>
                <Rating type='star' ratingCount={5} imageSize={17} onFinishRating={this.ratingCompleted} />
                <Text style={{ fontFamily: 'Muli', fontSize: 14, marginLeft: 10 }}> (20) </Text>
              </Flex>
            </Flex>

            <TouchableOpacity onPress={()=>Actions.feedbackview()} style={{ position: 'absolute', right: 10 }}>
              <Text style={{ color: colors.ORANGE, fontFamily: 'Muli-Bold', fontSize: 15 }}>See All Reviews</Text>
            </TouchableOpacity>
          </Flex>

          <WhiteSpace/>

          <TouchableOpacity onPress={() => Actions.jobclientprofile()}>
            <Flex style={{ backgroundColor: colors.WHITE, padding: 10 }}>
              <Image style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 5 }} source={{ uri: 'https://i.mydramalist.com/rYo6pc.jpg' }} />
              <Flex direction='column'>
                <Text style={[styles.listTitle, { marginLeft: 20 }]}>AliciaLeong</Text>
                <Rating type='star' ratingCount={5} imageSize={10} style={{ marginLeft: -14 }} onFinishRating={this.ratingCompleted} />
              </Flex>
            </Flex>
          </TouchableOpacity>

          <Bar />

          <Flex style={{ padding: 1 }}>
            <JobButton text={"class"} color={colors.GREEN}/>
            <JobButton text={"swimming"} color={colors.GREEN}/>
            <JobButton text={"group"} color={colors.GREEN}/>
          </Flex>

          <Bar />

          <Flex justify="between" style={{ paddingHorizontal: 12 }}>
            <Text style={styles.smallText}>Job reference no: J38291</Text>
            <Text style={styles.smallText}>Posted on 12 Jul, 2017</Text>
          </Flex>

          <Flex style={{ backgroundColor: colors.GREEN, marginTop: 16 }}>
            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', height: 80 }}>
              <Text style={[styles.headText, { textAlign: 'center', color: '#fff' }]}>Hire Talent</Text>
            </View>
            <View style={{ flex: 3, backgroundColor: '#62d275', height: 80, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="ios-chatbubbles" size={35} color={colors.WHITE} />
            </View>
          </Flex>

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  normalText: texts.CAPTION.PRIMARY,
  smallText: texts.CAPTION.SECONDARY,
  listTitle: texts.LISTTITLE,
  headText: texts.HEADLINE,
  content: {
    fontFamily: 'Muli', 
    fontSize: 14, 
    marginLeft: 10
  }
});
