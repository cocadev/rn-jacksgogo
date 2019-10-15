import api from './api'

class FaceAuth {
    constructor(microsoftAPIKey, microsoftAPIProxy = 'https://api.projectoxford.ai') {
        this.microsoftAPIKey = microsoftAPIKey;
        this.microsoftAPIProxy = microsoftAPIProxy;
    };

    async baseApi(sub_url, method, json_data) {
        let request = {
            method,
            headers: {
                'Ocp-Apim-Subscription-Key': this.microsoftAPIKey,
                Accept: "application/json",
            }
        };
        if (json_data) {
            request["body"] = JSON.stringify(json_data);
            request.headers['Content-Type'] = "application/json"
        }
        try{
            let response = await fetch(this.microsoftAPIProxy+sub_url, request);
            let responseJson = await response.json();
            return {response, responseJson}
        }catch(error){
            return error
        }
    }

    async createPersonGroup(personGroupID, personGroupName) {
        try{
            let result = await this.baseApi(`/face/v1.0/persongroups/${personGroupID}`, 'PUT', {name: personGroupName})
            return {
                status: result.response.status,
                data: result.responseJson
            };
        } catch (error) {
            return error
        }
    };

    async createPerson(personGroupID, personName) {
        try{
            let result = await this.baseApi(`/face/v1.0/persongroups/${personGroupID}/persons`, 'POST', {name: personName})
            return {
                status: result.response.status,
                data: result.responseJson
            };
        } catch (error) {
            return error
        }
        
    };

    async readPerson(personGroupID, personID) {
        try{
            let result = await this.baseApi(`/face/v1.0/persongroups/${personGroupID}/persons/${personID}`, 'GET', null)
            return {
                status: result.response.status,
                data: {
                    personID: result.responseJson.personId,
                    name: result.responseJson.name
                }
            };
        } catch (error) {
            return error
        }
    };

    async identify(personGroupID, faceIDs) {
        try {
            let result = await this.baseApi(`/face/v1.0/identify`, 'POST', {
                personGroupId: personGroupID,
                faceIds: faceIDs,
                maxNumOfCandidatesReturned: 1,
                confidenceThreshold: 0.5
            })
            // console.log('identify', result)
            return {
                status: result.response.status,
                data: result.responseJson
            };
        } catch (error) {
            return error
        }
    };

    async train(personGroupID) {
        try{
            let result = await this.baseApi(`/face/v1.0/persongroups/${personGroupID}/train`, 'POST', null)
            return {
                status: result.response.status,
                data: result.responseJson
            };
        } catch (error){
            return error
        }
    };

    async signin(personGroupID, file) {
        try {
            let faceResponse = await api.detectFace(file);

            if (faceResponse.status !== 200) {
                return {err: 'FAIL_DETECT', res:faceResponse};
            }

            if (!faceResponse.data.length) {
                return {err: 'NO_FACE', res:null};
            }

            let faceIDs = faceResponse.data.map(item => item.faceId);
            let identifyResponse = await this.identify(personGroupID, faceIDs);

            if (identifyResponse.status !== 200) {
                return {err:'FAIL_IDENTIFY', res: identifyResponse};
            }

            if (identifyResponse.data.length !== 1) {
                return {err:'TOO_MUCH_FACES', res : null};
            }

            if (!identifyResponse.data[0].candidates.length) {
                return {err:'STRANGER', res: null};
            }

            let personID = identifyResponse.data[0].candidates[0].personId;
            let readPersonResponse = await this.readPerson(personGroupID, personID);

            if (readPersonResponse.status !== 200) {
                return {err: 'FAIL_READPERSON', res:readPersonResponse};
            }

            return {err:null, res:readPersonResponse.data};
        } catch(error) {
            return {err:error, res:null};
        }
    };

    async signup(personGroupID, personName, file) {
        let createPersonResponse = await this.createPerson(personGroupID, personName);

        if (createPersonResponse.status !== 200) {
            return {err:'not create person', res:createPersonResponse};
        }

        let personID = createPersonResponse.data.personId;
        let createPersonFaceResponse = await api.createPersonFace(personGroupID, personID, file);
        // console.log('createPersonFaceResponse', createPersonFaceResponse)

        if (createPersonFaceResponse.status !== 200) {
            return {err:'not create face', res:createPersonFaceResponse};
        }

        // Train the persons group.
        let trainResponse = await this.train(personGroupID);

        let result = {
            personID: personID,
            personName: personName
        };

        return {err:null, res:result};
    };

    
};

export default FaceAuth;
