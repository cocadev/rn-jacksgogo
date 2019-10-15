import * as React from 'react';
import { Text, Image, View } from 'react-native';
import { colors } from '../common/colors';
import { Flex } from '@ant-design/react-native';

export default class CategorySmallItem extends React.Component {

    render() {
        const { text, icon } = this.props;
        return (
            <Flex align='start' style={{ backgroundColor: colors.WHITE, padding: 11, marginTop: 5 }}>
                <Image source={icon} style={{width:16, height:16, marginTop:3}} />
                <Flex direction="column" align='start' style={{paddingRight:15}}>
                    <Text style={{ fontFamily: 'Muli', fontSize: 14, marginLeft: 10 }}> {text} </Text>
                </Flex>
                <View style={{flex:1, alignItems:'flex-end'}}>
                  {this.props.rightElement}
                </View>
            </Flex>
        )
    }
}