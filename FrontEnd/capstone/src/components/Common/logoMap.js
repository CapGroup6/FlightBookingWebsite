const airlineNameMap = {
  'asiana': 'Asiana Airlines',
};

/*
 * Author: Jiawei Zhou
 * Final Edit Date: 2024/07/05
*/

export const getAirlineLogoUrls = (airlineNames) => {
  const logoUrls = airlineNames.map(name => {
    //for those don't have full name situation
    const fullName = airlineNameMap[name.toLowerCase()] || name;
    const logoUrl = `https://img.logo.dev/${fullName.toLowerCase().replace(/\s+/g, '')}.com?token=pk_IVeOTgTFSr-_zv0ee2W4CA`;
    console.log(`Generating logo URL for ${name}: ${logoUrl}`); //fortest
    return logoUrl;
  });

  return logoUrls;
};