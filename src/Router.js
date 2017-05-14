import { StackNavigator } from 'react-navigation';

import Main from './components/Main';
import Image from './components/Image';


const BaseNavigation = StackNavigator({
  Main: { screen: Main },
  Image: { screen: Image }
});

export default BaseNavigation;
