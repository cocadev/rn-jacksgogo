import * as React from 'react';
import { View, Text } from 'react-native';

export default class JobButton extends React.Component {

  render() {

    const { text, color } = this.props;

    return (
      <View style={{ borderColor: '#ddd', borderWidth: 1, borderRadius: 20, paddingVertical: 5, paddingHorizontal: 20,marginLeft:10, backgroundColor:'#fff' }}>
        <Text style={{ textAlign: 'center', color:color  }}>{text}</Text>
      </View>
    )
  }
}