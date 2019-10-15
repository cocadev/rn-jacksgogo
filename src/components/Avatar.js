import * as React from 'react';
import { Image } from 'react-native';

export default class Avatar extends React.Component {

  render() {

    const { image, size, local, left } = this.props;

    if(local){
      return (
        <Image
          style={{ width: size, height: size, borderRadius: size/2, marginRight: 10, marginLeft:left }}
          source={image}
        />)
    } else{
      return (
        <Image
          style={{ width: size, height: size, borderRadius: size/2, marginRight: 10, marginLeft:left }}
          source={{ uri: image }}
        />)
    }
  }
}