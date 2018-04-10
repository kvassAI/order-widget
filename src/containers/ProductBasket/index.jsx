import React from 'react';
import Reflux from 'reflux';
import {DebounceInput} from 'react-debounce-input';
import {Scrollbars} from 'react-custom-scrollbars';
import Header from 'src/components/Header';
import Actions from 'src/reflux/Actions';
import ProductStore from 'src/reflux/ProductStore';
import ProductList from 'src/components/ProductList';
import CloseIcon from 'src/components/SvgIcons/CloseIcon';
import T from 'src/utils/i18n';

class ProductBasket extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ProductStore;
  }

  handleCountChange(product, event) {
    const diff = parseInt(event.target.value - product.count);
    if (event.target.value > product.count) {
      Actions.onAddProduct(product.item, diff);
    } else {
      Actions.onRemoveProduct(product.item, event.target.value >= 0 ? diff : -product.count);
    }
  }

  renderBasketItem(product) {
    const addedKey = `${product.item._id.$oid}-1`;
    return (
      <li key={product.item._id.$oid}>
        <span className="product-item__title">{product.item.name}</span>
      </li>
    );
  }

  renderBasketPrice(product) {
    const addedKey = `${product.item._id.$oid}-1`;
    return (
      <li key={addedKey}>
        <DebounceInput
          className="product-item__count"
          minLength={1}
          debounceTimeout={500}
          value={product.count}
          onChange={event => this.handleCountChange(product, event)} />
        <span className="product_item__price">{product.item.price} {product.item.currency}</span>
        <span className="product_item__total">{product.item.price * product.count} {product.item.currency}</span>
      </li>
    );
  }

  render() {
    const {products, globalCount} = this.state;
    const productArray = [];
    let totalTax = 0;
    let totalSum = 0;
    let currency = ''

    Object.entries(products).forEach(([key, value]) => {
      if (value) {
        totalSum += value.item.price;
        totalTax += value.item.vat;

        if (!currency) currency = value.item.currency; // TODO better solution in the future here

        productArray.push(this.renderBasketItem(value));
        productArray.push(this.renderBasketPrice(value));
      }
    });

    return (
      <div className="product-basket">
        <Header showBackNav={true}>
          <span className="header-title">{T.translate('basket.header')}</span>
        </Header>
        <div className="kvass-widget__content-body">
          <div className="product-list">
            <div className="padding-container">
              <Scrollbars style={{ height: 380 }}>
                <ul>
                  {productArray}
                </ul>
              </Scrollbars>
            </div>
            <div className="product-sum">
              <div className="product-sum__line">
                <span>{T.translate('basket.products')}</span>
                <span>{globalCount}</span>
              </div>
              <div className="product-sum__line">
                <span>{T.translate('basket.tax')}</span>
                <span>{totalTax} {currency}</span>
              </div>
              <div className="product-sum__line">
                <span>{T.translate('basket.total')}</span>
                <span className="product-sum__total">{totalSum} {currency}</span>
              </div>
            </div>
          </div>
          <div className="kvass-widget__content-footer">
            <div className="footer-content">
              <button className="kvass-widget__primary-button">{T.translate('basket.checkout')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductBasket;
