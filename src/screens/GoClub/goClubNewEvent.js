import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import AllCategoriesGrid from '../../components/AllCategoriesGrid';
import { colors } from '../../common/colors';

export default class GoClubNewEvent extends React.Component {

  constructor(){
    super();
    this.state={
      modal:false
    }
  }

  renderModal() {
    return (
      <Modal
        visible={this.state.modal}
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
                <TouchableOpacity style={{height:50, flex:1, backgroundColor:colors.LIGHTPURPLE, alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({modal:false})}>
                  <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({ v:false})} style={{height:50, flex:1, backgroundColor:colors.RED, alignItems:'center', justifyContent:'center'}}>
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
      <View style={[commonStyles.container]}>
        <Header 
           title="Create New Event"
           leftElement={(
            <View style={{position:'absolute', left:12, height:40, width:40, backgroundColor:'#fff', justifyContent:'flex-end', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.setState({modal:true})}>
                <Text style={[texts.HEADLINE , {marginBottom:5, color:colors.PURPLE}]}>
                  Quit
                </Text>
              </TouchableOpacity>
            </View>
        )}
        />
        <Text style={[texts.LISTTEXT, {marginTop:12, marginLeft:12}]}>Choose a category for your event:</Text>
        <AllCategoriesGrid type='goclubnewevent'/>
        {this.renderModal()}
      </View>
    );
  }
}