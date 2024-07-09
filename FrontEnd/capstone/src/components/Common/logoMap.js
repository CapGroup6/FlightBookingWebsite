/*
 * Author: Jiawei Zhou
 * Final Edit Date: 2024/07/05
*/

export const getAirlineLogoUrls = (airlineNames) => {
  const logoUrls = airlineNames.map(name => {
    return `https://img.logo.dev/${name.toLowerCase().replace(/\s+/g, '')}.com?token=pk_IVeOTgTFSr-_zv0ee2W4CA`;
  });

  return logoUrls;
};