import {
    AsyncStorage
} from 'react-native';

import Polyline from '@mapbox/polyline'

const googleApiUrl = 'https://maps.googleapis.com/maps/api/'
const googleApiKey = 'AIzaSyBXhlNy_XyrJ6oSapG-UdcTU9E3EXUewoA'

module.exports = {

    async googleRequest(url, cb) {
        // console.log(url)
        try {
            // console.log(googleApiUrl + url + `&key=${googleApiKey}`)
            let response = await fetch(googleApiUrl + url + `&key=${googleApiKey}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
            // console.log(response)
            let responseJson = await response.json();
            // console.log(responseJson)
            if (response.status == 200) {
                cb(null, responseJson);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            // console.log(googleApiUrl + url + `&key=${googleApiKey}`)
            cb(error)
        }
    },

    getTripDuration(start, end, cb) {
        this.googleRequest( `distancematrix/json?origins=${start}&destinations=${end}&mode=driving`,cb )
    },

    getGeocode(location, cb){
        this.googleRequest(`geocode/json?latlng=${location.latitude},${location.longitude}`, cb)
    },

    getTripPath(start, end, cb){
        this.googleRequest(
            'directions/json?origin='+start+'&destination='+end+'&mode=driving&alternatives=true',
            (err, res) => {
                if ( err == null ){
                    let routes=[]
                    // console.log(res.routes)
                    res.routes.map((item)=>{
                        let duration = 0, distance = 0
                        let legLength = item.legs.length;
                        let points = Polyline.decode(item.overview_polyline.points)
                        let path = points.map((point)=>{
                            return {latitude: point[0], longitude: point[1]}
                        })
                        item.legs.map((leg)=>{
                            duration = duration + leg.duration.value
                            distance = distance + leg.distance.value
                        })
                        routes.push({path, duration, distance, start_address:item.legs[0].start_address, end_address:item.legs[legLength-1].end_address})
                    })
                    
                    cb(err, routes)    
                }else{
                    cb(err, null)
                }
            })
    }

}
