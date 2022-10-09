import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "./UserPool";

const AccountContext = createContext();

const Account = (props) => {

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session)=>{
                    if (err) {
                        reject(err);
                    } else {
                        const attributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    const results = {};

                                    for (let attribute of attributes) {
                                        const { Name, Value } = attribute;
                                        results[Name] = Value;
                                    }
                                    resolve(results);
                                }
                            });
                        });

                        resolve({ user, ...session, ...attributes });
                    }
                });
            } else {
                reject();
            }
        });
    };


    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });

            const authDetails = new AuthenticationDetails({ Username, Password });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    resolve(data);
                },
                onFailure: (err) => {
                    reject(err);
                },
                newPasswordRequried: (data) => {
                    resolve(data);
                },
            });
        })
    };

    const confirmRegistration = async (Username, ConfirmCode) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });

            user.confirmRegistration(ConfirmCode, true, async function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    };

    const resendConfirmationCode = async (Username) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });
            user.resendConfirmationCode(function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    };

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    };

    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout, confirmRegistration, resendConfirmationCode }}>
            { props.children }
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };