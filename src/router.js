import React, { PureComponent } from 'react'
import Main from './screens/Main'
import Test from './screens/test'
import JacksGoGo from './screens/Profile/jacksgogo'
import TalkToUs from './screens/Profile/talktous'
import Settings from './screens/Profile/settings'
import Payment from './screens/Profile/payment'
import ServiceListing from './screens/Profile/servicelisting'
import JobListing from './screens/Profile/joblisting'
import MyFavourites from './screens/Profile/myfavourites'
import ChangeRegion from './screens/Profile/changeregion'
// import PrivateProfile from './screens/Main/privateprofile'
import Credit from './screens/Profile/credit'
import Jacks from './screens/Profile/jacks'
import SearchJob from './screens/Main/MainSearch/searchjob'
import AdvancedSearch from './screens/Main/MainSearch/advancedsearch'
import JobProfile from './screens/Job/jobprofile'
import JobClientProfile from './screens/Job/jobclientprofile'
import AllServicesByClient from './screens/Job/allservicesbyclient'
import ServiceProfile from './screens/Job/serviceprofile'
import FavouriteJob from './screens/Main/MainSearch/favouritejob'
import AllJobSearch from './screens/Main/MainSearch/alljobsearch'
import SearchResult from './screens/Main/MainSearch/searchresult'
import Map from './screens/Job/map'
import MainChat from './screens/Job/MainChat'
import ClientChat from './screens/Job/ClientChat'
import LogBook from './screens/Job/logbook'
import review from './screens/Job/review'
import FeedbackView from './screens/Job/feedbackview'
import FullFeedBack from './screens/Job/fullfeedback'
import PostJob from './screens/Job/postjob'
import Location from './screens/Job/location'
import SignIn from './screens/Login/signIn'
import SignUp from './screens/Login/signup'
import ViewJob from './screens/Profile/viewjob'
import FavUser from './screens/Profile/Favuserprofile'
import EditPayment from './screens/Profile/editpayment'


import { KeyboardAvoidingView, Platform } from 'react-native'
import { Actions, Scene, Router } from 'react-native-router-flux'
import * as Font from 'expo-font'
import ChooseCountry from './screens/Profile/choosecountry';

//Job

//Profile


//GoClub
import GoClubHome from './screens/GoClub/goClubHome'
import GoClubCreate from './screens/GoClub/goClubCreate'
import goClubSearch from './screens/GoClub/goClubSearch'
import GoClubJoined from './screens/GoClub/goClubJoined';
import GoClubProfile from './screens/GoClub/goClubProfile';
import GoEventProfile from './screens/GoClub/goEventProfile';
import GoClubAll from './screens/GoClub/goClubAll';
import GoClubKeywordSearch from './screens/GoClub/goClubKeywordSearch';
import GoClubPastEvent from './screens/GoClub/goClubPastEvent';
import GoClubAllMembers from './screens/GoClub/goClubAllMembers';
import GoClubChat from './screens/GoClub/goClubChat';
import GoClubNewEvent from './screens/GoClub/goClubNewEvent';
import GoClubNewEventDetail from './screens/GoClub/goClubNewEventDetail';
import GoClubEdit from './screens/GoClub/goClubEdit';
import GoSummary from './screens/GoClub/goClubSummary';
import GoClubAllattendees from './screens/GoClub/goClubAllattendees';
import GoClubAllSchedules from './screens/GoClub/goClubAllSchedules';

//Profile
import profilePrivate from './screens/Profile/profilePrivate';
import ProfileEdit from './screens/Profile/profileEdit';
import ProfileLocation from './screens/Profile/profileLocation';
import GoClubCreateDetail from './screens/GoClub/goClubCreateDetail';
import GoClubCreateDetailTab3AddOthers from './screens/GoClub/goClubCreateDetailTab3AddOthers';
import GoClubMap from './screens/GoClub/goClubMap';

export default class App extends PureComponent {
  
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await this._loadAssets();
  }

  async _loadAssets() {
    await Font.loadAsync({
      'Muli-Bold': require('../assets/fonts/Muli-Bold.ttf'),
      'Muli-SemiBold': require('../assets/fonts/Muli-SemiBold.ttf'),
      'Muli': require('../assets/fonts/Muli.ttf'),
      'Princess': require('../assets/fonts/PrincessSofia-Regular.ttf'),
     
      

    });
    console.log('fonts loaded!');
    this.setState({ fontLoaded: true });
  }
  render() {
    const scenes = Actions.create(
      <Scene key="root">

        <Scene key="signin" component={SignIn} hideNavBar initial={false} />
        <Scene key="signup" component={SignUp} hideNavBar />

        <Scene key="main" component={Main} hideNavBar initial={false}/>
        <Scene key="test" component={Test} hideNavBar initial={false}/>
        <Scene key="jacksgogo" component={JacksGoGo} hideNavBar initial={false}/>
        <Scene key="talktous" component={TalkToUs} hideNavBar initial={false}/>
        <Scene key="settings" component={Settings} hideNavBar/>
        <Scene key="payment" component={Payment} hideNavBar />
        <Scene key="servicelisting" component={ServiceListing} hideNavBar initial={false} />
        <Scene key="joblisting" component={JobListing} hideNavBar initial={false}/>
        <Scene key="myfavourites" component={MyFavourites} hideNavBar initial={false} />
        <Scene key="changeregion" component={ChangeRegion} hideNavBar  />
        <Scene key="credit" component={Credit} hideNavBar />
        <Scene key="jacks" component={Jacks} hideNavBar />

        <Scene key="searchjob" component={SearchJob} hideNavBar />
        <Scene key="advancedsearch" component={AdvancedSearch} hideNavBar />
        <Scene key="searchresult" component={SearchResult} hideNavBar />
        <Scene key="jobprofile" component={JobProfile} hideNavBar />
        <Scene key="jobclientprofile" component={JobClientProfile} hideNavBar />
        <Scene key="allservicesbyclient" component={AllServicesByClient} hideNavBar />
        <Scene key="serviceprofile" component={ServiceProfile} hideNavBar />
        <Scene key="favouritejob" component={FavouriteJob} hideNavBar/>
        <Scene key="alljobsearch" component={AllJobSearch} hideNavBar />
        <Scene key="map" component={Map} hideNavBar initial={false}/>
        <Scene key="mainchat" component={MainChat} hideNavBar initial={false}/>
        <Scene key="logbook" component={LogBook} hideNavBar />
        <Scene key="review" component={review} hideNavBar />
        <Scene key="feedbackview" component={FeedbackView} hideNavBar />
        <Scene key="fullfeedback" component={FullFeedBack} hideNavBar />
        <Scene key="postjob" component={PostJob} hideNavBar />
        <Scene key="location" component={Location} hideNavBar />
        <Scene key="viewjob" component={ViewJob}  hideNavBar />
        <Scene key="favuser" component={FavUser}  hideNavBar />
        <Scene key="clientchat" component={ClientChat}  hideNavBar />
        <Scene key="editpayment" component={EditPayment}  hideNavBar  initial={false}/>
        <Scene key="choosecountry" component={ChooseCountry}  hideNavBar  initial={false}/>

        <Scene key="goclubhome" component={GoClubHome}  hideNavBar  initial={false}/>
        <Scene key="goclubcreate" component={GoClubCreate}  hideNavBar  initial={false}/>
        <Scene key="goclubsearch" component={goClubSearch}  hideNavBar  initial={false}/>
        <Scene key="goclubjoined" component={GoClubJoined}  hideNavBar  initial={false}/>
        <Scene key="gocluball" component={GoClubAll}  hideNavBar  initial={false}/>
        <Scene key="goclubkeywordsearch" component={GoClubKeywordSearch}  hideNavBar  initial={false}/>
        <Scene key="goclubprofile" component={GoClubProfile}  hideNavBar  initial={false}/>
        <Scene key="goeventprofile" component={GoEventProfile}  hideNavBar  initial={false}/>
        <Scene key="goclubpastevent" component={GoClubPastEvent}  hideNavBar  initial={false}/>
        <Scene key="gocluballmembers" component={GoClubAllMembers}  hideNavBar  initial={false}/>
        <Scene key="goclubchat" component={GoClubChat}  hideNavBar  initial={false}/>
        <Scene key="goclubnewevent" component={GoClubNewEvent}  hideNavBar  initial={false}/>
        <Scene key="goclubneweventdetail" component={GoClubNewEventDetail}  hideNavBar  initial={false}/>
        <Scene key="goclubedit" component={GoClubEdit}  hideNavBar  initial={false}/>
        <Scene key="gosummary" component={GoSummary}  hideNavBar  initial={false}/>
        <Scene key="gocluballattendees" component={GoClubAllattendees}  hideNavBar  initial={false}/>
        <Scene key="goclubschedule" component={GoClubAllSchedules}  hideNavBar  initial={false}/>
        <Scene key="goclubcreatedetail" component={GoClubCreateDetail}  hideNavBar  initial={false}/>
        <Scene key="goclubcreatedetailtab3addothers" component={GoClubCreateDetailTab3AddOthers}  hideNavBar  initial={false}/>
        <Scene key="goclubmap" component={GoClubMap}  hideNavBar  initial={false}/>

        <Scene key="profileprivate" component={profilePrivate}  hideNavBar  initial={false}/>
        <Scene key="profileedit" component={ProfileEdit}  hideNavBar />
        <Scene key="profilelocation" component={ProfileLocation}  hideNavBar />


      </Scene>
    );

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}>
        {this.state.fontLoaded == true ? <Router scenes={scenes} /> : null}
      </KeyboardAvoidingView>
    );
  }
}
