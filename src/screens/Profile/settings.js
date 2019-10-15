import React from 'react';
import { View, Text } from 'react-native';
import { texts } from '../../common/texts';
import { Switch, Button } from '@ant-design/react-native';
import { colors } from '../../common/colors';
import Header from '../../components/Header';
import { commonStyles } from '../../common/commonStyles';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked2: true,
    };
  }

  onSwitchChange1 = value => this.setState({ checked1: value });
  onSwitchChange2 = value => this.setState({ checked2: value });

  render() {
    return (
      <View style={commonStyles.container}>
        <Header action="settings" title="Settings" />
        <View style={[commonStyles.VIEW.listView, {paddingVertical:20}]}>
          <Text style={[texts.HEADLINE, {marginVertical:12}]}> Notifications </Text>
          <Text style={texts.LISTTEXT}> Allow us to send you news and </Text>
          <Text style={texts.LISTTEXT}> updates </Text>
          <Switch 
              style={commonStyles.OTHER.switch}
              checked={this.state.checked1}
              onChange={this.onSwitchChange1}
          />
        </View>
        <View style={commonStyles.VIEW.line}/>
        <View style={[commonStyles.VIEW.listView, {paddingVertical:20}]}>
          <Text style={[texts.HEADLINE, {marginVertical:12}]}> Sound </Text>
          <Text style={texts.LISTTEXT}> Play sound on incoming  </Text>
          <Text style={texts.LISTTEXT}> notifications </Text>
          <Switch 
              style={commonStyles.OTHER.switch}
              checked={this.state.checked2}
              onChange={this.onSwitchChange2}
          />
        </View>
        <View style={commonStyles.VIEW.line}/>
        <View style={[commonStyles.VIEW.listView, {paddingVertical:20}]}>
          <Text style={[texts.HEADLINE, {marginVertical:12}]}> Version </Text>
          <Text style={texts.LISTTEXT}> Version 1.0.1 </Text>
          <Button style={{position:'absolute', right:20, top:22, backgroundColor:colors.ORANGE, height:36}}>
            <Text style={[texts.LISTTEXT, {color:colors.WHITE}]}>Upgrade</Text>
          </Button>
        </View>
      </View>
    );
  }
}

