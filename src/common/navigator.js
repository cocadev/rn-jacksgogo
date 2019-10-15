import * as React from 'react'
import * as actions from "../store/common/actions"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/Main/MainSearch/main'
import FavJobScreen from '../screens/Main/MainSearch/favouritejob'
import FavServiceScreen from '../screens/Main/MainSearch/favouriteservice'
import FavUserScreen from '../screens/Profile/favouriteuser'
import SearchScreen from '../screens/Main/MainSearch/alljobsearch'
import SearchResultScreen from '../screens/Main/MainSearch/searchresult'
import SearchJob from '../screens/Main/MainSearch/searchjob'
import AdvancedSearch from '../screens/Main/MainSearch/advancedsearch'
import Tab2Screen from '../screens/GoClub/goClubHome'
import Tab3Screen from '../screens/Main/briefcase'
import ProfileScreen from '../screens/Main/profile'
import MyFavScreen from '../screens/Profile/myfavourites'
import NavTabBar from './TabBar/maintabbar'

const SearchNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    FavJob: FavJobScreen,
    FavService: FavServiceScreen,
    Search: SearchScreen,
    SearchJob: SearchJob,
    SearchResult: SearchResultScreen,
    AdvancedSearch: AdvancedSearch,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null
    }
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Home: ProfileScreen,
    MyFav: MyFavScreen,
    FavJob: FavJobScreen,
    FavService: FavServiceScreen,
    FavUser: FavUserScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null
    }
  }
);

const MainNavigator = createBottomTabNavigator(
  {
    Tab1: { screen: SearchNavigator },
    Tab2: { screen: Tab2Screen },
    Tab3: { screen: Tab3Screen },
    Tab4: { screen: ProfileNavigator },
  },
  {
    initialRouteName: 'Tab1',
    tabBarComponent: NavTabBar,
    tabBarPosition: 'bottom',
  }
);


class MainView extends React.Component {
  
    render() {
        return (
            <MainNavigator />
        )
    }
}

export default connect(
  state => ({
      token:state.common.token
  }),
  dispatch => ({
      actions: bindActionCreators(actions, dispatch)
  })
)(MainView);