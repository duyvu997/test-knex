const axios = require('axios');
const Logger = require('../logger');
const { DeepLinkType } = require('../../constant/deeplink');

const logger = Logger.create('Route/User');

const FIREBASE_API_KEY =
  process.env.FIREBASE_API_KEY || 'AIzaSyBFYiFl-i60or9-UryYYvYbhqimPE4kUKw';
const DOMAIN_URI_PREFIX =
  process.env.DOMAIN_URI_PREFIX || 'https://futureenglish.page.link';
const ANDROID_PACKAGE_NAME =
  process.env.ANDROID_PACKAGE_NAME || 'english.future.appandroid';
const IOS_PACKAGE_NAME = process.env.IOS_PACKAGE_NAME || 'english.future.app';
const REDIRECT_DOMAIN =
  process.env.REDIRECT_DOMAIN || 'https://futureenglish.fun/';
const IS_HOME_PAGE = process.env.IS_USE_HOME_PAGE || false;

logger.info({
  REDIRECT_DOMAIN,
  IOS_PACKAGE_NAME,
  ANDROID_PACKAGE_NAME,
  IS_HOME_PAGE,
});

const create = async (link) => {
  try {
    const data = {
      url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${FIREBASE_API_KEY}`,
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      data: {
        dynamicLinkInfo: {
          domainUriPrefix: DOMAIN_URI_PREFIX,
          link: IS_HOME_PAGE ? REDIRECT_DOMAIN : link,
          androidInfo: {
            androidPackageName: ANDROID_PACKAGE_NAME,
          },
          iosInfo: {
            iosBundleId: IOS_PACKAGE_NAME,
          },
        },
      },
    };
    logger.info({ data });
    const request = await axios.request(data);

    if (request && request.status === 200 && request.data) {
      return request.data.shortLink;
    }

    return null;
  } catch (error) {
    logger.error('create deeplink failed: ', error);
    return null;
  }
};

const createRequestJoinLink = (conversationId) => {
  const url = `${REDIRECT_DOMAIN}?type=${DeepLinkType.REQUEST_JOIN}&conversationId=${conversationId}`;
  return create(url);
};

const createPostLink = (postId) => {
  const url = `${REDIRECT_DOMAIN}?type=${DeepLinkType.POST}&postId=${postId}`;
  return create(url);
};

const createUserLink = (userId) => {
  const url = `${REDIRECT_DOMAIN}?type=${DeepLinkType.USER}&userId=${userId}`;
  return create(url);
};

export default {
  create,
  createRequestJoinLink,
  createPostLink,
  createUserLink,
};
