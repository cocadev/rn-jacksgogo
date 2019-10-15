import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { texts } from '../common/texts';
import { Flex, Toast } from '@ant-design/react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../common/colors';
import { images } from '../common/images';

export default class GarageView extends React.Component {
    render() {
        let {Title, User, Amount, Category, Attachments} = this.props
        return (
            <TouchableOpacity onPress={Toast.info('hey man')} style={styles.container}>
                <View>
                    <Image source={{ uri: Attachments.length > 0 ? Attachments[0].URL : images.no_image }} style={styles.image} />
                </View>
                <View style={styles.content}>
                        <Flex align='start'>
                            <Image style={{width:25, height:25, marginLeft:2}} source={{uri:Category.Image}} resizeMode="contain"/>
                            <Text style={[styles.listText1, {}]}>{Title}</Text>
                        </Flex>
                        <Flex style={{width:'95%', backgroundColor:'#fff'}} align='start'>
                            <MaterialIcons
                                name="near-me"
                                size={20}
                                color={colors.GREY2}
                                style={{ marginLeft: 2 }}
                                />
                            <Text style={[styles.listText2, {fontSize:14, marginTop:3, marginLeft:4}]}>{User.Address.ROAD_NAME}</Text>
                        </Flex>
                        <Flex>
                            <MaterialIcons
                                name="monetization-on"
                                size={20}
                                color={colors.GREY2}
                                style={{ marginLeft: 2 }}
                            />
                            <Text style={[styles.listText1, {marginLeft:3}]}> { '$'}  {Amount}</Text>
                        </Flex>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 80,
        flexDirection: 'row'
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
    },
    content: {
        margin: 10,
        flex: 1,
    },
    name:{
        fontSize:16,
        fontWeight:'bold',
        color:'#333'
    },
    postal_code:{
        fontSize:12,
        color:'grey',
        marginTop:5
    },
    info:{
        fontSize:12,
        color:'grey',
        marginTop:5
    },
    tag:{
        height:16, 
        borderRadius:8, 
        paddingHorizontal:5,
        justifyContent:'center',
        alignItems:'center'
    },
    listText1: texts.LISTTEXT,
    listText2: texts.CAPTION.SECONDARY,
})