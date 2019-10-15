import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import { colors } from '../../common/colors';
import { JOBLISTING } from '../../common/staticdata';
import GoEventListItem from '../../components/GoEventListItem';
import { RadioButtons  } from 'react-native-radio-buttons'

const options = [
    "By Date: Latest ",
    " By Date: Earliest"
];

  function setSelectedOption(selectedOption){
    this.setState({
      selectedOption
    });
  }
 
  function renderOption(option, selected, onSelect, index){
    const style = selected ? { fontWeight: 'bold', color:colors.PURPLE} : {};
 
    return (
      <TouchableOpacity onPress={onSelect} key={index}>
        <Text style={style}>{option}</Text>
      </TouchableOpacity>
    );
  }
 
  function renderContainer(optionNodes){
    return <View style={{flexDirection:'row', padding:7}}>{optionNodes}</View>;
  }
export default class GoClubPastEvent extends React.Component {

  state={
      content:'',
  }

  _renderItem = ({ item }) => (
     <GoEventListItem image={item.image} joined={item.joined} start={item.start} end={item.end} title={item.title} hi ={item.hi}/>
   );

  _ItemSeparator = () => <View style={styles.separator} />;
 
  render() {
    const {content} = this.state
    return (
          <View style={commonStyles.container}>
            <Header title={'Past Events'} />
              <View style={commonStyles.subHeader}>
              <RadioButtons
                options={ options }
                onSelection={ setSelectedOption.bind(this) }
                selectedOption={this.state.selectedOption }
                renderOption={ renderOption }
                renderContainer={ renderContainer }
              />
              </View>

              <FlatList
                data={JOBLISTING}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
              />
         
          </View>
    )
  }
}

const styles = StyleSheet.create({
    button:{
        marginHorizontal:12,
        borderColor:colors.PURPLE,
        borderWidth:1,
        borderRadius:1,
        marginVertical:10,
        padding:8
    },
    separator: {
      height: 5,
      backgroundColor: 'rgba(0, 0, 0, .08)',
    },
   
});