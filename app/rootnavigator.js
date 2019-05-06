import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import MenuScreen from './menu';
import OrdenScreen from './orden';
import CategoriasScreen from './categorias';
import ProductosCategoriaScreen from './productos_categoria';

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
  Productos: {
    screen: ProductosCategoriaScreen
  },
},
{
  headerMode: 'none'
})

export default createAppContainer(RootNavigator)
