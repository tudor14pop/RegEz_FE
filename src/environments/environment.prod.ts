const IP_ADDRESS_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const webProtocol = IP_ADDRESS_REGEX.test(window.location.host) ? 'http' : 'http';

export const environment = {
  production: true,
  serverUrl: `${webProtocol}://${window.location.host}/api`,
};


