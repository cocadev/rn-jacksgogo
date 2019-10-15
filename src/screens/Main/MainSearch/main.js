import React from "react";
import MainListItem from "../../../components/MainListItem";

import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, TextInput, Modal } from "react-native";
import { Grid } from "@ant-design/react-native";
import { texts } from "../../../common/texts";
import { colors } from "../../../common/colors";
import { images } from "../../../common/images";
import { commonStyles } from '../../../common/commonStyles';
import { Foundation } from '@expo/vector-icons';
import { SegmentedControls } from 'react-native-radio-buttons'
import Carousel from 'react-native-banner-carousel';
import api from "../../../service/api";
import LottieScreen from "../../../components/Lottie";
import UtilService from "../../../utils/utils";
import Avatar from '../../../components/Avatar'
import i from "../../../common/i";

const width = Dimensions.get("window").width;
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;
const options = ["Grab a Job", "Hire A Talent"];

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "#14B1F8",
      isWaiting: false,
      content: "",
      location: "",
      type: "Job",
      recommend_list: [],
      items: [],
      isRefreshing: false,
      categories: [],
      index: 0,
      selectedOption: 'Grab a Job',
      color: colors.CYAN
    };
    gHandler = this

  }

  getAllCategories() {
    api.getAllCategories((err, res) => {
      if (err == null) {
        this.setState({ categories: res.Value })
      }
    })
  }

  getAllItems(type, count) {
    this.setState({ isWaiting: true })
    api.getAllItems(type, count, (err, res) => {
      if (err == null) {
        this.setState({ items: res.Value, isWaiting: false })
      }
    })
  }

  componentDidMount() {
    this.getAllCategories()
    this.getAllItems('Jobs', 5)
  }

  refresh() {
    this.setState({ items: null })
    this.getAllItems('Jobs', 5)
  }

  setSelectedOption(selectedOption) {
    this.setState({ selectedOption });
    if (this.state.index == 0) {
      this.setState({ index: 1, items: null })
      this.getAllItems('Services', 5)
    }
    else {
      this.setState({ index: 0, items: null })
      this.getAllItems('Jobs', 5)
    }
  }

  _renderItem = ({ item }) => (
    <MainListItem
      data={item}
      image={item.Attachments.length > 0 ? item.Attachments[0].URL : images.no_image}
      title={item.Title}
      money={item.Amount}
      type={this.state.index}
      position={item.Location ? item.Location.BUILDING : "No Address"}
      IsUrgent={item.IsUrgent}
      icon={item.Category.Image}
      ID={item.ID}
      currency={item.CurrencyCode}
    />
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {

    const { index, categories, items, isWaiting } = this.state;

    return (
      <ScrollView style={i.container}>

        <View style={i.mainHeader}>
          <SegmentedControls
            tint={UtilService.getColor(index)}
            selectedTint={'white'}
            backTint={colors.WHITE}
            options={options}
            allowFontScaling={false} // default: true
            onSelection={this.setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption}
            // optionStyle={{fontFamily: 'AvenirNext-Medium'}}
            optionContainerStyle={{ flex: 1 }}
          />

          <View style={[commonStyles.VIEW.searchView, { marginTop: 0 }]}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("SearchJob")} style={{ position: 'absolute', right: 35, top: 13 }}>
              <Avatar image={UtilService.getSearchIcon(index)} size={30} local={true} />
            </TouchableOpacity>
            <TextInput
              style={[commonStyles.INPUT.favSearch]}
              underlineColorAndroid="transparent"
              placeholder="Search for Jobs"
              onChangeText={content => this.setState({ content })}
              value={this.state.content}
            />
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate(index == 0 ? 'FavJob' : 'FavService') }}
              style={{ position: 'absolute', right: 2, top: 13 }}>
              <View style={[commonStyles.ICON.inputIcon, { backgroundColor: UtilService.getColor(index) }]}>
                <Foundation name="heart" size={21} color={colors.WHITE} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}
        >
          <Image
            style={{ width: BannerWidth, height: BannerHeight }}
            source={require('../../../../assets/images/slider/1.jpeg')}
          />
          <Image
            style={{ width: BannerWidth, height: BannerHeight }}
            source={require('../../../../assets/images/slider/2.jpeg')}
          />
        </Carousel>

        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              fontSize: 15,
              color: colors.BLACK,
              lineHeight: 20,
              fontFamily: "Muli"
            }}
          >
            All Job Categories
          </Text>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <Grid
            data={categories}
            columnNum={4}
            isCarousel
            hasLine={false}
            renderItem={dataItem => (
              <TouchableOpacity
                onPress={() => { this.props.navigation.navigate("Search", { index: this.state.index, filter: dataItem.Name, ID: dataItem.ID }) }}
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
                <Text style={[styles.smallText, { textAlign: "center" }]}>
                  {dataItem.Name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.refresh()}>
            <Text style={{ marginHorizontal: 15, color: colors.ORANGE }}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", padding: 10 }}>

          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 15,
              color: colors.BLACK,
              lineHeight: 20,
              fontFamily: "Muli"
            }}
          >
            Recommended Jobs
          </Text>

          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate("Search", { index: this.state.index, filter: 'Active Jobs Around' }) }}
          >
            <Text style={{ textAlign: "right", fontSize: 15, color: UtilService.getColor(index) }}> View All </Text>
          </TouchableOpacity>
        </View>

        {isWaiting && <LottieScreen />}

        <FlatList
          data={items}
          keyExtractor={(item, i) => String(i)}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._ItemSeparator}
        />

        <View style={{ height: 28 }} ></View>

      </ScrollView>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  content: {
    paddingVertical: 24
  },
  image: {
    width: "100%",
    height: 176,
    resizeMode: "cover",
    opacity: 0.7,
  },
  sliderText: texts.SLIDERTEXT,
  sliderText2: {
    fontSize: 30,
    position: "absolute",
    top: 42
  },
  smallText: texts.CAPTION.PRIMARY,
  separator: {
    height: 5,
    backgroundColor: "rgba(0, 0, 0, .08)"
  },

});
