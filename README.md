# KitPagoFlow.js

Kit de pago Flow para NodeJS version >= 8.0 de tipo funcional y modular

# Uso

```js
const BASE_URL = 'https://mi-url.cl';
const FlowApi = require('./src');
const { new_order, read_confirm, read_result, build_response } = FlowApi({
  FLOW_URL_EXITO: `${BASE_URL}/api/reservas/pago-exito`,
  FLOW_URL_FRACASO: `${BASE_URL}/api/reservas/pago-fracaso`,
  FLOW_URL_CONFIRMACION: `${BASE_URL}/api/reservas/pago-confirmacion`,
  FLOW_URL_RETORNO: BASE_URL,
  FLOW_URL_PAGO: 'http://flow.tuxpan.com/app/kpf/pago.php',
  FLOW_KEY: path.join(__dirname, '/keys'),
  FLOW_LOGPATH: path.join(__dirname, '/logs'),
  FLOW_COMERCIO: 'miemail@gmail.com',
});
```

Para Generar una nueva orden se usa new_order, que recibe un objeto con la información del pedido

```javascript
const order = new_order({
  orden_compra: pedidoID,
  monto: 99999,
  concepto: `Pago pedido: ${pedidoID}`,
  email_pagador: 'emailcliente@gmail.com',
});
```

Luego se debe enviar por metodo POST a la url definida en `FLOW_URL_PAGO` la string formada en `order`

```html
<form method="post" action="[FLOW_URL_PAGO]">
  <input type="hidden" name="parameters" value="[order]">
  <button type="submit">Pagar Ya!</button>
</form>
```

Para mayor informacion acerca del uso de Flow: [Api Flow](http://flow.cl/apiFlow.php)

API armada en base a los trabajos realizados por [EstebanFuentealba](url=https://github.com/EstebanFuentealba/node-flow-cl) y [Nabor](https://github.com/nabor/node-kpf), pero con un enfoque mas funcional
