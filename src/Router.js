import { StackNavigator } from 'react-navigation';

import Main from './components/Main';
import Image from './components/Image';
import Thumb from './components/Thumb';
import Video from './components/Video';
import ThumbPage from './components/ThumbPage';



const BaseNavigation = StackNavigator({
  Main: { screen: Main },
  Image: { screen: Image },
  Thumb: { screen: Thumb },
  Video: { screen: Video },
  ThumbPage: { screen: ThumbPage }

});

export default BaseNavigation;
