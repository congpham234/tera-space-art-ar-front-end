import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-west-2_ZKYKKPswQ",
    ClientId: "4udqgeelfqkfv4bscnadm1bfoi"
}

export default new CognitoUserPool(poolData);