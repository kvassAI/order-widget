import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import {Scrollbars} from 'react-custom-scrollbars';
import Actions from 'src/reflux/Actions';
import {ShareActor} from 'src/utils';
import AddIcon from 'src/components/SvgIcons/AddIcon';
import MinusIcon from 'src/components/SvgIcons/MinusIcon';

class ProductList extends Reflux.Component {
  constructor(props) {
    super(props);
    this.endpoint = ShareActor().endpoint;
    this.apiKey = ShareActor().apiKey;
  }

  renderProductImg(image_url) {
    if (!image_url) return;
    return (
      <img src={`${this.endpoint}images/${image_url}?api_key=${this.apiKey}`} alt="product image"/>
    );
  }

  render() {
    const {productList} = this.props;
    if (!productList.length) return (
      <div className="product-list--empty">
        <p>{T.translate('product.noResults')}</p>
      </div>
    );

    const children = productList.map((product) => {
      return (
        <li className="product-list-item" key={product._id.$oid}>
          <div className="product-list-item__img">
            {this.renderProductImg(product.image_url)}
          </div>
          <span className="product-list-item__name">{product.name}</span>
          <div className="product-list-item__toolbar">
            <a href="#" onClick={() => Actions.onRemoveProduct(product)}><MinusIcon className="svg-icon--red"></MinusIcon></a>
            <a href="#" onClick={() => Actions.onAddProduct(product)}><AddIcon className="svg-icon--green"></AddIcon></a>
          </div>
        </li>
      );
    });

    return (
      <Scrollbars style={{ height: 500 }}>
        <ul>
          {children}
        </ul>
      </Scrollbars>
    );
  }
}

ProductList.defaultProps = {
  productList: []
};

ProductList.propTypes = {
  productList: PropTypes.array.isRequired
};

export default ProductList;
