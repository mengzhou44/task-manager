"use strict";
const axios = require("axios");
const GoogleAuth = require("google-auth-library");

const internals = {};

internals.getGoogleProfileByToken = async token => {
  const auth = new GoogleAuth();
  const client = new auth.OAuth2(process.env.GOOGLE_CLIENT_ID, "", "");

  return new Promise((resolve, reject) => {
    client.verifyIdToken(token, [process.env.GOOGLE_CLIENT_ID], (e, login) => {
      if (e) {
        reject(e);
      } else {
        const payload = login.getPayload();

        resolve({
          email: payload.email,
          firstName: payload.given_name,
          lastName: payload.family_name,
          picture: payload.picture,
          locale: payload.locale
        });
      }
    });
  });
};

internals.getFacebookProfileByToken = async userToken => {
  try {
    const clientId = process.env.FACEBOOK_APP_ID;
    const clientSecret = process.env.FACEBOOK_SECRECT;
 
    const appLink = `https://graph.facebook.com/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
    const res = await axios.get(appLink);
    const appToken = res.data.access_token;
  
    const link1 = `https://graph.facebook.com/v3.2/debug_token?input_token=${userToken}&access_token=${appToken}`;
    const response1 = await axios.get(link1);
    const userId = response1.data.data.user_id;
  
    const link2 = `https://graph.facebook.com/v3.2/${userId}?fields=email,first_name,last_name,picture&access_token=${userToken}`;
    const response2 = await axios.get(link2);
  
    return {
      email: response2.data.email,
      firstName: response2.data.first_name,
      lastName: response2.data.last_name,
      picture: response2.data.picture.data.url
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getProfileByToken = async ({providerType, providerToken}) => {

  switch (providerType) {
    case "google":
      return await internals.getGoogleProfileByToken(providerToken);

    case "facebook":
      return await internals.getFacebookProfileByToken(providerToken);

    default:
      throw new Error(`invalid provider type  ${providerType}`);
  }
};

module.exports = { getProfileByToken };
