import { StackNavigator } from 'react-navigation';

import Main from './components/Main';
import Image from './components/Image';
import Thumb from './components/Thumb';
import Video from './components/Video';


const BaseNavigation = StackNavigator({
  Main: { screen: Main },
  Image: { screen: Image },
  Thumb: { screen: Thumb },
  Video: { screen: Video }


});

export default BaseNavigation;
