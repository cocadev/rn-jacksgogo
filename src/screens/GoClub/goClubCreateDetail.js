import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { colors } from '../../common/colors';
import GoClubCreateDetailTab1 from './goClubCreateDetailTab1';
import GoClubNewEventDetailTab2 from './goClubNewEventDetailTab2';
import GoClubNewEventDetailTab3 from './goClubNewEventDetailTab3';
import GoClubNewEventDetailTab5 from './goClubNewEventDetailTab5';
import GoClubNewEventDetailTab4 from './goClubNewEventDetailTab4';
import { Actions } from 'react-native-router-flux';
import GoClubCreate from './goClubCreate';
import GoClubCreateDetailTab3 from './goClubCreateDetailTab3';

const progressStepsStyle = {
  activeStepIconBorderColor: colors.WHITE,
  activeLabelColor: colors.ORANGE,
  activeStepNumColor: colors.WHITE,
  activeStepIconColor: colors.PURPLE,
  completedStepIconColor: colors.PURPLE,
  completedProgressBarColor: colors.PURPLE,
  completedCheckColor: '#4bb543',
  activeLabelColor:colors.PURPLE,
  borderWidth:2,
  borderStyle:'dashed'
};

const buttonTextStyle = {
  color: '#686868',
  fontWeight: 'bold'
};

export default class GoClubCreateDetail extends React.Component {

  constructor(){
    super();
    this.state = {
      modalQuit:false,
    }
  }

  static navigationOptions = {
    header: null
  };

  onNextStep = () => {
    console.log('called next step');
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
  };

  renderModalQuit() {
    return (
      <Modal
        visible={this.state.modalQuit}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={commonStyles.modalView}>
          <View style={commonStyles.modalContent}>
               <View style={{justifyContent:'center', alignItems:'center', flex:2}}>
                  <Text style={[texts.HEADLINE, {marginVertical:12}]}>Quit Creating New GoClub</Text>
                  <Text>All info will be lost.</Text>
               </View>
               <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <TouchableOpacity style={{height:50, flex:1, backgroundColor:colors.LIGHTPURPLE, alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({modalQuit:false})}>
                  <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.setState({modalQuit:false});Actions.pop()}} style={{height:50, flex:1, backgroundColor:colors.RED, alignItems:'center', justifyContent:'center'}}>
                  <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>Quit</Text>
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
        <Header title="Create New GoClub" leftElement={(
            <View style={{position:'absolute', left:12, height:40, width:40, backgroundColor:'#fff', justifyContent:'flex-end', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.setState({modalQuit:true})}>
                <Text style={[texts.HEADLINE, {marginBottom:5, color:colors.PURPLE}]}>
                  Quit
                </Text>
              </TouchableOpacity>
            </View>
        )}/>
        <View style={{position:'absolute', backgroundColor:colors.WHITE, elevation:1, width:'100%', flexDirection:'row', top:50, alignItems:'center'}}>
            <Image source={require('../../../assets/images/social/icon_cat_family.png')} style={{width:26, height:26, marginLeft:20}} />
            <Text style={[texts.CAPTION.LISTTEXT, {marginLeft:20}]}>Family</Text>
        </View>
        <View style={{paddingHorizontal:16, flex:1}}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Describe"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            onSubmit={this.onSubmitSteps}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <GoClubCreateDetailTab1 />
            
          </ProgressStep>
       
          <ProgressStep
            label="Limit"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            onSubmit={this.onSubmitSteps}
            centerContainer
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <GoClubNewEventDetailTab4 />
          </ProgressStep>

          <ProgressStep
            label="Admn"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            onSubmit={this.onSubmitSteps}
            centerContainer
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
            <GoClubCreateDetailTab3 />
          </ProgressStep>
        </ProgressSteps>
        {this.renderModalQuit()}
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  photoButton: {
    flexDirection:'row',
    height: 42,
    borderColor: colors.PURPLE,
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 20,
    paddingLeft: 10,
    justifyContent:'center',
    alignItems:'center'
    // fontSize:16
  },
});
