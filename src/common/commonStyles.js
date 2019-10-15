import { colors } from "./colors";

export const commonStyles = {

    modalView:{ flex: 1, backgroundColor: "rgba(0, 0, 0,0.5)", alignItems: "center", justifyContent: "center"},
    modalContent:{ width: 290, height: 150, borderRadius: 2, shadowColor: "black", justifyContent: "center", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.4, shadowRadius: 3, backgroundColor: "white"},
    longbutton:{ marginHorizontal:12, borderColor:colors.PURPLE, borderWidth:1, borderRadius:1, marginVertical:10, padding:8 },
















    container:{
        flex:1,
        paddingTop:24
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
    },
    VIEW:{

        main:{
            padding:12,
            justifyContent:'center',
            alignItems:'center'
        },
        centerView:{
            flex:1,
            width:'100%',
            alignItems:'center',
            justifyContent:'center'
        },
        rowView:{
            width:'100%',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row'
        },
        listView:{
            backgroundColor:'#fff',
            paddingLeft:12,
            paddingVertical:10
        },
        line:{
            backgroundColor:'#dbdbdb',
            width:'100%',
            height:1,
        },
        searchView:{
            justifyContent: 'center',
            marginTop: 18,
        },
        headerElement:{
            position:'absolute', left:12, height:40, width:40, backgroundColor:'#fff', justifyContent:'flex-end', alignItems:'center'
        }
    },
    INPUT:{
        favSearch:{
            height: 36,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 10,
            paddingLeft: 10,
            width: '88%',
            fontSize:18
        },
        normal:{
            height: 36,
            borderColor: colors.PURPLE,
            borderWidth: 1,
            borderRadius: 2,
            marginTop: 10,
            paddingLeft: 10,
            marginHorizontal:12,
            fontSize:16
        },
        simple:{
            height: 42,
            borderColor: colors.GREY1,
            borderWidth: 1,
            borderRadius: 2,
            marginTop: 10,
            paddingLeft: 10,
            marginHorizontal:12,
            fontSize:16
        }
    },
    IMAGE:{
        logo_size_150: { width:150, height:150 },
        logo_round_30: { width:30, height:30, borderRadius:15 },
        logo_round_35: { width:35, height:35, borderRadius:18 },

        logo_round_80: { width:80, height:80, borderRadius:40 },
        user_avatar: { width: 70, height: 70, borderRadius: 50, marginLeft: 5}
    },
    ICON: {
        roundIIcon:{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
        inputIcon:{width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center'},
        largeSocialIcon: { width:35, height:50 },
        iconRight:{position:'absolute', right:10, width:35, height:35},
        iconLeft:{position:'absolute', left:10, width:35, height:35},
        urgent:{width: 40, height: 40, position: 'absolute', left: 0, top: 0},
        sold:{width: 40, height: 40, position: 'absolute', right: 0, bottom: 0},
        favIcon:{width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}
    },

    subHeader:{
        elevation:1, 
        flexDirection:'row', 
        paddingHorizontal:12, 
        paddingVertical:10, 
        justifyContent:'space-between', 
        backgroundColor:colors.WHITE, 
        alignItems:'center'
    },

    longbutton:{
        marginHorizontal:12,
        borderColor:colors.PURPLE,
        borderWidth:1,
        borderRadius:1,
        marginVertical:10,
        padding:8
    },

    OTHER: {
        switch:{
            transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],
            top: 22,
            position:'absolute',
            right:20
        }
    },

    LOADING:{
        indicatorContainer: {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0,0.5)",
            alignItems: "center",
            justifyContent: "center"
        },
        indicator: {
            width: 80,
            height: 80,
            borderRadius: 5,
            shadowColor: "black",
            alignItems: "center",
            justifyContent: "center",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            backgroundColor: "white"
        },
    },

    MODAL:{
        Container: {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0,0.5)",
            alignItems: "center",
            justifyContent: "center"
        },
        Content: {
            width: 280,
            height: 150,
            borderRadius: 5,
            shadowColor: "black",
            justifyContent: "center",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            backgroundColor: "white"
        },
    }
};
