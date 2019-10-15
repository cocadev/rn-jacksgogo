import { AsyncStorage } from 'react-native';
import { colors } from '../common/colors';
import { images } from "../common/images";

// import * as CONST from '../constant'

class UtilService {

    ////////////////////////
    ///// date systeme /////
    ////////////////////////
    static getDateTime(date) {
        let d = new Date(date);
        const padWithZero = number => {
          const string = number.toString();
          if (number < 10) {
            return "0" + string;
          }
          return string;
        };
        return padWithZero(d.getMonth()+1)+'/'+padWithZero(d.getDate()) + '  ' + d.getFullYear()
    }

    static getHourMinutes(date){
        let dd = new Date(date)
        let h = dd.getHours(), m = dd.getMinutes()
        let AP = ' AM'
        if (h > 12){
            h = h - 12;
            AP = ' PM'
        }
        
        return h+''+ AP
    }

    static getDay(date){
        let dd = new Date(date)
        let h = dd.getDay()
        console.log('what is day ', h)
        if (h == 0){
            AP = ' Sunday '
        }if (h == 1){
            AP = ' Monday '
        }if (h == 2){
            AP = ' Tuesday '
        }if (h == 3){
            AP = ' Wednesday '
        }if (h == 4){
            AP = ' Thirsday '
        }if (h == 5){
            AP = ' Friday '
        }if (h == 6){
            AP = ' Saturday '
        }
        return AP
    }

    ////////////////////////
    ///// color system /////
    ////////////////////////
    static getColor(index){
        if (index == 0){
            color = colors.CYAN
        }
        if (index == 1){
            color = colors.GREEN
        }
        if (index == 2){
            color = colors.ORANGE
        }
        return color
    }

    static getSearchIcon(index){

        switch(index){
            case 0:
            img = images.icon.cyan_search;break;
            case 1:
            img = images.icon.green_search;break;
            case 2:
            img = images.icon.orange_search;break;
            default:
            img = images.icon.purple_search;break;
        }
        return img
    }

    static getBackIcon(index){

        switch(index){
            case 0:
            img = images.icon.button_backarrow_cyan;break;
            case 1:
            img = images.icon.button_backarrow_green;break;
            case 2:
            img = images.icon.button_backarrow_orange;break;
            default:
            img = images.icon.button_backarrow_purple;break;
        }
        return img
    }

    static getFilterIcon(index){
        switch(index){
            case 0:
            img = images.button_filter_cyan;break;
            case 1:
            img = images.button_filter_green;break;
            case 2:
            img = images.button_filter_orange;break;
            default:
            img = images.button_filter_purple;break;
        }
        return img
    }

    static getMapIcon(index){
        switch(index){
            case 0:
            img = images.button_mapview_cyan;break;
            case 1:
            img = images.button_mapview_green;break;
            case 2:
            img = images.button_mapview_orange;break;
            default:
            img = images.button_mapview_purple;break;
        }
        return img
    }

    static getRemoveIcon(index){
        if (index == 0){
            img = images.icon.cyan_remove
        }
        if (index == 1){
            img = images.icon.green_remove
        }
        if (index == 2){
            // img = images.icon.cyan_search
        } else{
           img = images.icon.purple_remove
        }
        return img
    }

    static getShareIcon(index){

        switch(index){
            case 0:
            img = images.icon_share_cyan;break;
            case 1:
            img = images.icon_share_green;break;
            default:
            img = images.icon_share_purple;break;
        }
        return img
    }

    static getEditIcon(index){
        switch(index){
            case 0:
            img = images.button_edit_cyan;break;
            case 1:
            img = images.button_edit_green;break;
            case 2:
            img = images.button_edit_orange;break;
            default:
            img = images.button_edit_purple;break;
        }
        return img
    }

    static getDuplicateIcon(index){
        switch(index){
            case 0:
            img = images.button_duplicate_cyan;break;
            case 1:
            img = images.button_duplicate_green;break;
            default:
            img = images.button_duplicate_purple;break;
        }
        return img
    }

    static getDeleteIcon(index){
        switch(index){
            case 0:
            img = images.button_delete_cyan;break;
            case 1:
            img = images.button_delete_green;break;
            case 3:
            img = images.button_delete_orange;break;
            default:
            img = images.button_delete_purple;break;
        }
        return img
    }

    static getMoreIcon(index){
        switch(index){
            case 0:
            img = images.button_more_cyan;break;
            case 1:
            img = images.button_more_green;break;
            case 3:
            img = images.button_more_orange;break;
            default:
            img = images.button_more_purple;break;
        }
        return img
    }

    static getMoreActiveIcon(index){
        switch(index){
            case 0:
            img = images.button_more_active_cyan;break;
            case 1:
            img = images.button_more_active_green;break;
            case 3:
            img = images.button_more_active_orange;break;
            default:
            img = images.button_more_active_purple;break;
        }
        return img
    }

    static getFlagIcon(index){
        switch(index){
            case 0:
            img = images.icon_flag_cyan;break;
            case 1:
            img = images.icon_flag_green;break;
            case 3:
            img = images.icon_flag_disabled;break;
            default:
            img = images.icon_flag_purple;break;
        }
        return img
    }

    




    // static getPastDateTime(ts) {
    //     if (ts == null || ts == "")
    //         return "";

    //     var mins = Math.floor((Date.now() / 1000 - ts / 1000000000) / 60);

    //     if (mins <= 0) {
    //         return "just now";
    //     } else if (mins < 60) {

    //         if (mins == 1)
    //             return mins + " minute ago";
    //         else
    //             return mins + " minutes ago";
    //     } else if (mins < 24 * 60) {

    //         var hours = Math.floor(mins / 60)

    //         if (hours == 1)
    //             return hours + " hour ago";
    //         else
    //             return hours + " hours ago";
    //     } else if (mins >= 24 * 60) {

    //         var days = Math.floor(mins / (24 * 60))

    //         if (days == 1)
    //             return days + " day ago";
    //         else
    //             return days + " days ago";
    //     }
    // }

    // static convertToSlug(Text) {
    //     return Text
    //         .toLowerCase()
    //         .replace(/[^\w ]+/g, '')
    //         .replace(/ +/g, '-')
    //         ;
    // }
    // static getPercentOfSelf(start, duration){
    //     if ( start == null ) return 0
    //     let past = ((new Date()).getTime() - (new Date(start)).getTime())/60000
    //     if ( past > duration ) return 100
    //     return 100*past/duration
    //   }
    // static getPositionString(pos) {
    //     if (!pos)
    //         return "—"

    //     return this.ordinal_suffix_of(pos);
    // }

    // static deg2rad(angle) {
    //     return (angle * Math.PI / 180);
    // }

    // static getDistanceFromLatLonInMile(lat1, lon1, lat2, lon2) {
    //     var R = 6371; // Radius of the earth in km
    //     var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    //     var dLon = this.deg2rad(lon2 - lon1);
    //     var a =
    //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    //         Math.sin(dLon / 2) * Math.sin(dLon / 2)
    //         ;
    //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     var d = R * c; // Distance in km
    //     return Number((d / 1.6093).toFixed(1));
    // }

    // static getBackColor(imageObj) {
    //     if (!imageObj)
    //         return 'rgb(255,255,255)';

    //     var backgroundColor = imageObj._env ? 'rgb(' + imageObj._env['input-md-average'].r + ','
    //         + imageObj._env['input-md-average'].g + ','
    //         + imageObj._env['input-md-average'].b + ')' : 'rgb(255,255,255)'

    //     return backgroundColor;
    // }

    // static getPricesString(prices) {
    //     var p = prices || 1;
    //     var ret = ""
    //     for (i = 1; i <= p; i++) {
    //         ret += '₡'
    //     }

    //     return ret
    // }

    // static capitalizeFirstLetter(string) {
    //     if (string === undefined) {
    //         return null;
    //     }

    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }

    // static isValid(data) {
    //     if (!data) return false

    //     if (data == '') return false

    //     return true
    // }

    // static isValidURL(data) {
    //     if (!this.isValid(data))
    //         return false

    //     if (data == 'http://')
    //         return false

    //     return true
    // }

    // static fixUrl(url) {
    //     if (this.isValidURL(url)) {
    //         url = url.toLowerCase()
    //         //if ((url.indexOf("http://") == -1) && (url.indexOf("https://") == -1)) {
    //         if (url.indexOf(":") == -1) {
    //             url = "http://" + url
    //         }
    //         return url;
    //     }

    //     return null;
    // }

    // static ordinal_suffix_of(i) {
    //     var j = i % 10,
    //         k = i % 100;
    //     if (j == 1 && k != 11) {
    //         return i + "st";
    //     }
    //     if (j == 2 && k != 12) {
    //         return i + "nd";
    //     }
    //     if (j == 3 && k != 13) {
    //         return i + "rd";
    //     }
    //     return i + "th";
    // }

    // static async saveLocalStringData(key, strValue) {
    //     await AsyncStorage.setItem('@gogo:' + key, strValue);
    //     return true;
    // }

    // static async saveLocalObjectData(key, obj) {
    //     await AsyncStorage.setItem('@gogo:' + key, JSON.stringify(obj));
    // }

    // static async getLocalStringData(key) {
    //     let ret = await AsyncStorage.getItem('@gogo:' + key);

    //     return ret
    // }

    // static async getLocalObjectData(key) {
    //     let ret = await AsyncStorage.getItem('@gogo:' + key);
    //     if (ret != null) {
    //         return JSON.parse(ret)
    //     } else {
    //         return null
    //     }
    // }

    // static async removeLocalObjectData(key) {
    //     let ret = await AsyncStorage.removeItem('@gogo:' + key);
    //     return true
    // }

    // getHours(date){
    //     let d = new Date(date)
        
    // }





    // static getAddress1(contact) {
    //     var rets = []
    //     if(contact){
    //         if (contact.Street)
    //         rets.push(contact.Street)
    //         if (contact.Street2)
    //             rets.push(contact.Street2)
    //         return rets.join(' ')
    //     }
        
    // }
    // static getAddress2(contact) {
    //     if(contact){
    //         var rets = []
    //         if (contact.City)
    //             rets.push(contact.City)
    //         if (contact.State)
    //             rets.push(contact.State)
    //         if (contact.Country)
    //             rets.push(this.getCountryNameFromAlpha3(contact.Country))
    //         return rets.join(' ')
    //     }
    // }
    // static getCountryNameFromAlpha3(alpha) {
        
    //     var exist = CONST.countries.find((o)=>{
    //         return o.alpha3==alpha
    //     })
    //     if(exist){
    //         return exist.name
    //     }
        
    // }

    // static getLabelFromStatus(status){
    //     switch(status){
    //     case CONST.DELIVERY_STATUS_DRAFT:
    //         return 'Requested'
    //     case CONST.DELIVERY_STATUS_READY:
    //         return 'Ready'
    //     case CONST.DELIVERY_STATUS_START:
    //         return 'Started'
    //     case CONST.DELIVERY_STATUS_PAUSE:
    //         return  'Paused'
    //     case CONST.DELIVERY_STATUS_RESUME:
    //         return 'Resumed'
    //     case CONST.DELIVERY_STATUS_ARRIVED:
    //         return 'Arrived'
    //     case CONST.DELIVERY_STATUS_UNLOADING:
    //     return 'Unloading'
    //     case CONST.DELIVERY_STATUS_FINISH:
    //         return 'Finish'
    //     case CONST.DELIVERY_STATUS_RETURNING:
    //         return 'Returning'
    //     case CONST.DELIVERY_STATUS_ARRIVED:
    //         return 'Arrived'
    //     }
    // }
    // static trunc(text,cnt) {
    //     return text.length > cnt ? `${text.substr(0, cnt)}...` : text;
    // }
    

    //   static getDateTime(date) {
    //     let d = new Date(date);
    //     const padWithZero = number => {
    //       const string = number.toString();
    //       if (number < 10) {
    //         return "0" + string;
    //       }
    //       return string;
    //     };
    //     return d.getFullYear()+'-'+padWithZero(d.getMonth()+1)+'-'+padWithZero(d.getDate())+' '+padWithZero(d.getHours())+':'+padWithZero(d.getMinutes())
    //   }

    //   static getHourMinutes(date){
    //     let dd = new Date(date)
    //     let h = dd.getHours(), m = dd.getMinutes()
    //     let AP = ' AM'
    //     if (h >12){
    //         h = h - 12;
    //         AP = ' PM'
    //     }
        
    //     return h+':'+m+AP
    //   }

    ////////////////////////
    ///// date systeme /////
    ////////////////////////
    static getDateTime(date) {
        let d = new Date(date);
        const padWithZero = number => {
          const string = number.toString();
          if (number < 10) {
            return "0" + string;
          }
          return string;
        };
        return padWithZero(d.getMonth()+1)+'/'+padWithZero(d.getDate()) + '  ' + d.getFullYear()
    }

    static getHourMinutes(date){
        let dd = new Date(date)
        let h = dd.getHours(), m = dd.getMinutes()
        let AP = ' AM'
        if (h > 12){
            h = h - 12;
            AP = ' PM'
        }
        
        return h+''+ AP
    }

    static getDay(date){
        let dd = new Date(date)
        let h = dd.getDay()
        console.log('what is day ', h)
        if (h == 0){
            AP = ' Sunday '
        }if (h == 1){
            AP = ' Monday '
        }if (h == 2){
            AP = ' Tuesday '
        }if (h == 3){
            AP = ' Wednesday '
        }if (h == 4){
            AP = ' Thirsday '
        }if (h == 5){
            AP = ' Friday '
        }if (h == 6){
            AP = ' Saturday '
        }
        return AP
    }

    ////////////////////////
    ///// color systeme ////
    ////////////////////////
    static getColor(index){
        if (index == 0){
            color = colors.CYAN
        }
        if (index == 1){
            color = colors.GREEN
        }
        if (index == 2){
            color = colors.ORANGE
        }
        return color
      }
}

export default UtilService
