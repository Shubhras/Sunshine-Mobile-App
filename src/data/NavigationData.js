import { Images } from '../constants/images';

const NavigationData = [
  {
    my_profile: [
      {
        label: 'Account Details',
        images: Images.accountDetails,
        imageColor: '#687cf0',
        hederTitle: 'Edit Profile',
        onPress: 'AccountDetails',
      },
      {
        label: 'Upgrade Account',
        images: Images.upgradeAccount,
        imageColor: null,
        hederTitle: 'Upgrade Account',
        onPress: 'UpgradeAccount',
      },
      {
        label: 'Settings',
        images: Images.settings,
        imageColor: '#9a91c4',
        hederTitle: 'Settings',
        onPress: 'Settings',
      },
      {
        label: 'Contact us',
        images: Images.connectUs,
        imageColor: '#88e398',
        hederTitle: 'Contact us',
        onPress: 'Contactus',
      },
      {
        label: 'Numerology Numbers Match',
        images: Images.numerology,
        imageColor: null,
        hederTitle: 'Numerology Numbers',
        onPress: 'NumerogogyNumberMatch',
      },
      {
        label: 'Blocked Users',
        images: Images.blockedUsers,
        imageColor: '#9a91c4',
        hederTitle: 'Blocked Users',
        onPress: 'BlockedUsers',
      },
    ],
  },
];

// Exporting
export default NavigationData;
