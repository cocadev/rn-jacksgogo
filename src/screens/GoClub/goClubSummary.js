import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import { colors } from '../../common/colors';
import { TestTags, FEEDBACK3 } from '../../common/staticdata';
import JobButton from '../../components/JobButton';
import Header from '../../components/Header';

export default class GoSummary extends React.Component {

  constructor(){
      super();
      this.state={
        modalDone:false
      }
  }

  renderModalDone() {
        return (
          <Modal
            visible={this.state.modalDone}
            transparent={true}
            onRequestClose={() => {}}
          >
            <View style={commonStyles.modalView}>
              <View style={commonStyles.modalContent}>
                   <View style={{justifyContent:'center', alignItems:'center', flex:2}}>
                      <Text style={[texts.HEADLINE, {marginVertical:12}]}>Event Posted!</Text>
                      <Text>Event reference no. : E38291-11</Text>
                      <Text>Good luck!</Text>
                   </View>
                   <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>this.setState({modalDone:false})} style={{height:50, flex:1, backgroundColor:colors.PURPLE, alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({modalDone:false})}>
                      <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>View Event Details</Text>
                    </TouchableOpacity>
                   </View>
                 </View>
            </View>
          </Modal>
        );
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Header title="Summary" />
        <View style={{ backgroundColor:colors.WHITE, elevation:1, width:'100%', flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../../../assets/images/social/icon_cat_family.png')} style={{width:26, height:26, marginLeft:20}} />
            <Text style={[texts.CAPTION.LISTTEXT, {marginLeft:20}]}>Sports</Text>
        </View>

        <View style={{marginTop:10, flex:1}}>
            <View style={{flexDirection:'row', backgroundColor:colors.WHITE, paddingVertical:6}}>
                <View style={{ alignItems:'center', width:80}}>
                   <Image source={require('../../../assets/images/none/counter_purpleactive.png')} style={{width:14, height:14}} />
                   <Text style={{color:colors.PURPLE}}>Describe</Text>
                </View>
                <View>
                    <Text style={[texts.HEADLINE]}>Badminton Match</Text>
                    <Text style={{marginTop:6}}>{'Let\'s have a friendly badminton match! \nCome join us and have fun together!'}</Text>
                    <ScrollView horizontal style={{ padding: 1, marginTop:10 }}>
                        {
                            FEEDBACK3.map((data, index) => 
                                <Image source={{uri:data.image}} style={{width:60, height:60, marginHorizontal:5}}/>
                            )
                        }                 
                    </ScrollView>
                    <ScrollView horizontal style={{ padding: 1, marginTop:10 }}>
                        {
                            TestTags.map((data, index) => 
                                <JobButton key={index} text={data.Tag} color={colors.PURPLE} />
                            )
                        }                 
                    </ScrollView>
                </View>
            </View>

            <View style={{flexDirection:'row', backgroundColor:colors.WHITE, paddingVertical:6, marginTop:10}}>
                <View style={{ alignItems:'center', width:80}}>
                   <Image source={require('../../../assets/images/none/counter_purpleactive.png')} style={{width:14, height:14}} />
                   <Text style={{color:colors.PURPLE}}>Time</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={[texts.LISTTEXT]}>Every Sat 10:00 AM - 12:30 PM</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', backgroundColor:colors.WHITE, paddingVertical:6, marginTop:10}}>
                <View style={{ alignItems:'center', width:80}}>
                   <Image source={require('../../../assets/images/none/counter_purpleactive.png')} style={{width:14, height:14}} />
                   <Text style={{color:colors.PURPLE}}>Address</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={[texts.LISTTEXT]}>{'Jurong Sports Complex,\n3, Jurong West Avenue 982374'}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', backgroundColor:colors.WHITE, paddingVertical:6, marginTop:10}}>
                <View style={{ alignItems:'center', width:80}}>
                   <Image source={require('../../../assets/images/none/counter_purpleactive.png')} style={{width:14, height:14}} />
                   <Text style={{color:colors.PURPLE}}>Limit</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={[texts.LISTTEXT]}>No pax limit</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', backgroundColor:colors.WHITE, paddingVertical:6, marginTop:10}}>
                <View style={{ alignItems:'center', width:80}}>
                   <Image source={require('../../../assets/images/none/counter_purpleactive.png')} style={{width:14, height:14}} />
                   <Text style={{color:colors.PURPLE}}>Cost</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={[texts.LISTTEXT]}>$ 12.00 /pax</Text>
                </View>
            </View>
        </View>

        <TouchableOpacity onPress={()=>this.setState({modalDone:true})} style={{backgroundColor:colors.PURPLE, alignItems:'center'}}>
            <Text style={[texts.HEADLINE, {color:colors.WHITE, padding:15}]}>Post New Event</Text>
        </TouchableOpacity>

        {this.renderModalDone()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    separator: {
        height: 5,
        backgroundColor: 'rgba(0, 0, 0, .08)',
    },
});
