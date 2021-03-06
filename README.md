![Kvass logo](http://res.cloudinary.com/dftspnwxo/image/upload/v1527581938/kvass_logo_sc7xlm.svg)

# Kvass Ordering Widget
[Kvass](https://kvass.ai) offers a platform as a service that digitizes core business functions and optimizes resource allocation with baked-in machine learning capabilities.

Kvass ordering widget uses the [Kvass](https://kvass.ai) platform for product, order, payment and user management.


## Requirement

- A Kvass API Key ([request one](mailto:hello@kvass.ai)).
- A [Firebase](https://firebase.com/) account for user authentication
- A [Stripe](https://stripe.com/) account for payment.
- A [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) key for places autocomplete.

## Install

From the [unpkg](https://unpkg.com/) CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@kvass.ai/order-widget@1.1.0/dist/kvass.bundle.min.js"></script>
```

From [npm](https://npmjs.org)

```sh
npm install @kvass.ai/order-widget
```

## Demo
Try out our [demo](https://kvassAI.github.io/order-widget/demo/index.html)

## Getting started
Add the required script dependencies in your header, and remember to add your [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) key.

Add a div element in the body with an id of your choosing.

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kvass.ai/order-widget@1.1.0/dist/kvass.css">
  <script src="https://js.stripe.com/v3/" async></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
  <script src="https://unpkg.com/@kvass.ai/order-widget@latest/dist/kvass.bundle.js"></script>
</head>

<body>
  <div id="kvass-example-instance"></div>
</body>
```

#### init(options)

- domElementId {String}
- apiKey {String}
- endpoint {String}
- lng {String}
- firebaseConfig {Object}
- stripeApiKey {String}

Initialize the widget by providing the required configuration, using your Kvass API key and Kvass endpoint (`https://qa.kvass.ai/` for our QA environment or `https://api.kvass.ai/` for our production environment), Firebase domain and API key for the user verification and authentication, a Stripe API key to process payments and the locale you want to use (en or no are the only supported locals)

```html
<script>
  KvassOrdering.init({
    domElementId: 'kvass-example-instance',
    apiKey: "KVASS_API_KEY",
    endpoint: "KVASS_API_ENDPOINT",
    lng: 'en',
    firebaseConfig: {
      domain: "YOUR_FIREBASE_DOMAIN",
      apiKey: "YOUR_FIREBASE_APIKEY"
    },
    stripeApiKey: "YOUR_STRIPE_KEY"
  });
</script>
```

#### open()

function to open the widget

```html
<script>
  KvassOrdering.open();
</script>
```

#### close()

function to close the widget

```html
<script>
  KvassOrdering.close();
</script>
```

#### destroy()

function to destroy the widget instance

```html
<script>
  KvassOrdering.destroy();
</script>
```

## Development

Install dependencies:

```sh
npm install
```
Add config file named keys.json to the config folder, containing your keys:

```json
{
  "domElementId": "",
  "apiKey": "",
  "endpoint": "",
  "lng": "",
  "firebaseConfig": {
    "domain": "",
    "apiKey": ""
  },
  "stripeApiKey": ""
}
```

```sh
npm run start
```
