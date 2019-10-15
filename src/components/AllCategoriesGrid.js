import * as React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Grid } from "antd-mobile-rn";
import api from "../service/api";
import { texts } from '../common/texts';
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get("window").width;

export default class AllCategoriesGrid extends React.Component {

    state={
        categories:[]
    }

    componentDidMount(){
        this.getAllCategories()
    }

    getAllCategories(){
        api.getAllCategories((err,res)=>{
        if (err == null ){ 
            this.setState({ categories:res.Value })
        }})
    }
 
  render() {

   const { type } = this.props;

    return (
        <View style={{ marginHorizontal: 10, marginTop:6 }}>
        <Grid
          data={this.state.categories}
          columnNum={4}
          isCarousel
          hasLine={false}
          renderItem={dataItem => (
            <TouchableOpacity
              onPress={()=>{
                if(type == 'gocluball'){
                  Actions.gocluball()
                } else if(type == 'goclubcreate'){
                  Actions.goclubcreate()
                } else if(type == 'goclubcreatedetail'){
                  Actions.goclubcreatedetail()
                } else if(type == 'goeventnew'){
                  Actions.goeventnew()
                } else if(type == 'goclubnewevent'){
                  Actions.goclubneweventdetail()
                } else{
                  Actions.gocluball()
                }
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                marginHorizontal: 3,
                width: width / 5,
                height: width / 5
              }}
            >
              <Image
                source={{ uri: dataItem.Image }}
                style={{ width: 35, height: 35 }}
                alt=""
              />
              <Text style={[texts.CAPTION.PRIMARY, { textAlign: "center" }]}>
                {dataItem.Name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}