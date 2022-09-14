import { CURRENT_USER, PERSIST, TOKEN } from './constants';

export const authLogin = ({
  currentUser,
  token,
}: {
  currentUser: any;
  token: any;
}) => {
  window.localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
  window.localStorage.setItem(TOKEN, JSON.stringify(token));
};

export const getToken = () => {
  const token = window.localStorage.getItem(TOKEN);
  // token not exists
  if (!token) {
    clearStorage();
    return undefined;
  }

  const tokenDecode = JSON.parse(token);

  const current_time = new Date().getTime() / 1000;
  // token expired
  if (current_time > tokenDecode.expiry) {
    clearStorage();
    window.location.href = '/login';
    return undefined;
  }
  return token;
};

export const getCurrentUser = () => {
  const currentUser = window.localStorage.getItem(CURRENT_USER);
  if (currentUser) {
    return { ...JSON.parse(currentUser) };
  }
  return null;
};

export const updateCurrentUser = (data: any) => {
  const token = JSON.parse(getToken() || '');
  const currentUser = getCurrentUser();
  window.localStorage.setItem(
    CURRENT_USER,
    JSON.stringify({
      ...currentUser,
      email: data.email,
      name: data.name,
      name_kana: data.name_kana,
      profile_image: data.profile_image,
    })
  );
  window.localStorage.setItem(
    TOKEN,
    JSON.stringify({ ...token, uid: data.email })
  );
};

export const clearStorage = () => {
  window.localStorage.removeItem(CURRENT_USER);
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(PERSIST);
};
