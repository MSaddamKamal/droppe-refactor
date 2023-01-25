import * as React from "react";
import lodash from 'lodash'
import { FaStar } from "react-icons/fa";
import styles from "./product-list-components.module.css";

interface IPostsProps {
  products: any;
  onFav: (title: string) => void;
}


export default class Posts extends React.Component<IPostsProps, {}> {
  constructor(props: any) { super(props) }
  render(){
    let productsarr = []
      for (const [i, p] of this.props.products.entries()) {
        productsarr.push(
          <Product key={i} index={i} product={p} onFav={this.props.onFav} />
        );
    }
    return <div>{lodash.reverse(productsarr)}</div>
  }
}

export const Product: React.FC<{
  index: number;
  product: { title: string; description: string; price: number; isFavorite: boolean; rating: {rate: number; count: number} };
  onFav: (title: string) => void;
}> = ({ product, onFav }) => {
  const {product: productClass, productBody, actionBarItem, actionBarItemLabel} = styles
  // Problem: Now product title can be too long, I just put overflowX as fix now
  return (
    <span className={productClass} style={{display: 'inline-block', overflowX: 'scroll', float: 'none', clear: 'both'}}>
      <span className={styles['product-title']} style={{overflowX: 'hidden'}}>{product.title}</span>

      <p><strong>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</strong></p>

      <p><b>Price: ${+product.price}</b></p>

      <p className={productBody}>
        <span><b>Description:</b></span>
        <br/>
        {product.description}
     </p>

      <span className={styles['action_bar']} style={{display: 'table', width: "100%"}}>
        <span
          className={`${actionBarItem} ${
            product.isFavorite ? "active" : ""
          }`}
          role="button"
          onClick={() => {
              onFav(product.title);
          }}
        >
          <FaStar /> <span className={actionBarItemLabel}>{!!(!!(product.isFavorite)) ? 'Remove from favorites' : 'Add to favorites'}</span>
        </span>
      </span>
    </span>
  );
};
