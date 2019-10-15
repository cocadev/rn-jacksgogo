import FaceAuth from './faceService'

const azureEndPoint = 'https://southeastasia.api.cognitive.microsoft.com'
const azureFaceApiKey = '807aafea1cd3421eafc6a7788e4de6be'

const azureDatabaseEndPoint = 'https://rocktree.azure-api.net/vm'
const azureDatabaseApiKey = '1b195ea5a124444298d155e831d7affe'

const appPersonGroupID = "rocktree-visitors"
const appPersonGroupName = "RockTree"


module.exports = {

    async Init(cb) {
        this.createPersonGroup(appPersonGroupID, appPersonGroupName, cb)

        // var username = await UtilService.getLocalStringData('username');
        // var password = await UtilService.getLocalStringData('password');
        // if (password) {
        //     this.login(username, password)
        // }
    },

    faceLogin(file, cb) {
        this.signin(appPersonGroupID, file, cb)
    },

    faceSingup(personName, file, cb) {
        this.singup(appPersonGroupID, personName, file, cb)
    },

    async addPicture(personID, facePictureBase64Data, cb) {
        let faceAuth = new FaceAuth(azureFaceApiKey, azureEndPoint);
        let response1 = await faceAuth.createPersonFace(groupID, personID, facePictureBase64Data)
        let response2 = await faceAuth.train(groupID);
        cb(null, response2)
    },

    async createPersonGroup(groupID, groupName, cb) {
        let faceAuth = new FaceAuth(azureFaceApiKey, azureEndPoint);
        let response = await faceAuth.createPersonGroup(groupID, groupName);
        cb(null, response)
    },

    async signin(groupID, file, cb) {
        let faceAuth = new FaceAuth(azureFaceApiKey, azureEndPoint);
        let response = await faceAuth.signin(groupID, file);
        cb(response.err, response.res)
    },

    async singup(groupID, personName, file, cb) {
        let faceAuth = new FaceAuth(azureFaceApiKey, azureEndPoint);
        let response = await faceAuth.signup(groupID, personName, file);
        cb(null, response)
    },
}

