import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import MenuScreen from './menu';

const RootNavigator = createSwitchNavigator({
  Menu: {
    screen: MenuScreen
  },
},
{
  headerMode: 'none'
})

export default createAppContainer(RootNavigator)
