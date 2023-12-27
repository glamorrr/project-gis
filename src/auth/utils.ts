// routes
import { refreshTokenTimeMinutes } from 'src/config';
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    localStorage.removeItem('accessToken');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string | null, refreshToken: string | null) => {
  let tokenTimeout;

  if (accessToken && refreshToken) {
    try {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // This function below will handle when token is expired
      const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
      tokenExpired(exp);

      // deepcode ignore UsageOfUninitializedVariable: <please specify a reason of ignoring this>
      clearTimeout(tokenTimeout);

      tokenTimeout = setTimeout(async () => {
        if (localStorage.getItem('accessToken') === null) {
          return;
        }

        const res = await axios.post('/auth/token/refresh', {
          refresh_token: localStorage.getItem('refreshToken'),
        });

        setSession(res.data.access_token, res.data.refresh_token);
      }, refreshTokenTimeMinutes * 60 * 1000);
    } catch (err) {
      throw err;
    }
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    delete axios.defaults.headers.common.Authorization;
  }
};
