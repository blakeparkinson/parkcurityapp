import { StackNavigator } from 'react-navigation';

import Main from './components/Main';
import Image from './components/Image';
import Thumb from './components/Thumb';

const BaseNavigation = StackNavigator({
  Main: { screen: Main },
  Image: { screen: Image },
  Thumb: { screen: Thumb }

});

export default BaseNavigation;
