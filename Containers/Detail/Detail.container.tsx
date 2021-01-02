import React, {useEffect, useState} from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Action} from 'redux';
import {actions} from '../../Reducers/Cart.reducer';
import DetailComponent from './Detail.component';
import {Product} from '../../Components/ProductItem.component';
import WooCommerce from '../../Services/WooCommerce';
import {NavigationParams, routes} from '../../Navigations';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<NavigationParams>;
}

const DetailContainer = (): JSX.Element => {
  const initialProduct = {
    id: 1,
    name: '',
    price: 0,
    description: '',
    average_rating: '',
    images: [],
  };

  const [product, setProduct] = useState<Product>(initialProduct);
  const [imagesShown, showImages] = useState(false);
  const route = useRoute<RouteProp<NavigationParams, 'Detail'>>();
  const dispatch = useDispatch();

  const handlers = {
    handleShowImages: (): void =>
      showImages((prevState: boolean) => !prevState),
    addToCart: (product: Product): Action => {
      navigation.navigate('Orders', {screen: routes.Cart});

      return dispatch(actions.addToCart(product));
    },
  };

  useEffect(() => {
    WooCommerce.get(`/products/${route.params.id}`).then(({data}) => {
      setProduct(data);
    });
  }, [route.params.id]);

  return (
    <DetailComponent
      {...handlers}
      imagesShown={imagesShown}
      product={product}
    />
  );
};

export default DetailContainer;
