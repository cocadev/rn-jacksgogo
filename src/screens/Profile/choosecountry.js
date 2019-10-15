import React from "react"
import Header from "../../components/Header"
import { View, StyleSheet } from "react-native"

class ChooseCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

 

  render() {

    return (
      <View style={styles.container} >

          <Header title={"Choose Country"}/>
          <View style={{ marginTop: 10, flex:1,  justifyContent:'center' }}>

          </View>
        
      </View>
    );
  }
}

export default ChooseCountry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eceff1"
  },
});
