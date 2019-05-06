import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import MenuScreen from './menu';
import OrdenScreen from './orden';
import CategoriasScreen from './categorias';

const RootNavigator = createSwitchNavigator({
  Menu: {
    screen: MenuScreen
  },
  Orden: {
    screen: OrdenScreen
  },
  Categorias: {
    screen: CategoriasScreen
  },
},
{
  headerMode: 'none'
})

export default createAppContainer(RootNavigator)
