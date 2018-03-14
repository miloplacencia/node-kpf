const {
  FlowSign,
  FlowSignValidate,
  FlowPack,
  getPubPrivKeys,
} = require('./dependencias');
const { queryStringToObject, objectToQueryString } = require('./helpers');
const { FLOW_DEFAULT, ORDER_DEFAULT } = require('./config');

function FlowAPI(CONFIG = FLOW_DEFAULT) {
  const config = {
    ...FLOW_DEFAULT,
    ...CONFIG,
  };

  const order = {
    ...ORDER_DEFAULT,
    MedioPago: config.FLOW_MEDIOPAGO,
  };

  const keys = getPubPrivKeys(config.FLOW_KEY);
  const flow_sign = FlowSign(keys.prv_key);
  const flow_sign_validate = FlowSignValidate(keys.pub_key);

  const flow_pack = FlowPack(flow_sign);

  /**
   * Crea una nueva Orden para ser enviada a Flow
   * @param {string} orden_compra El número de Orden de Compra del Comercio
   * @param {number} monto El monto de Orden de Compra del Comercio
   * @param {string} concepto El concepto de Orden de Compra del Comercio
   * @param {string} email_pagador El email del pagador de Orden de Compra del Comercio
   * @param {string} [medio_pago='Non'] El Medio de Pago (1,2,9)
   * @returns {string} flow_pack Paquete de datos firmados listos para ser enviados a Flow
   */
  function new_order({
    orden_compra,
    monto,
    concepto,
    email_pagador,
    medio_pago = 'Non',
  } = {}) {
    if (medio_pago == 'Non') {
      medio_pago = config.FLOW_MEDIOPAGO;
    }

    order.Monto = monto;
    order.Pagador = email_pagador;
    order.Concepto = concepto;
    order.MedioPago = medio_pago;
    order.OrdenNumero = orden_compra;

    return flow_pack({ config, order });
  }

  function read_confirm(response) {
    if (!response) throw new Error('Invalid response');

    const $params = queryStringToObject(response);

    if (!Object.keys($params).length) throw new Error('Sin Parametros');

    if (!$params.status) {
      // $this->flow_log("Respuesta sin status", "read_confirm");
      throw new Error('Invalid response status');
    }
    order.Status = $params.status;
    // $this->flow_log("Lee Status: " . $params['status'], "read_confirm");
    if (!$params.s) {
      // $this->flow_log("Mensaje no tiene firma", "read_confirm");
      throw new Error('Invalid response (no signature)');
    }
    if (!flow_sign_validate($params.s, response)) {
      // $this->flow_log("firma invalida", "read_confirm");
      throw new Error('Invalid signature from Flow');
    }
    // $this->flow_log("Firma verificada", "read_confirm");
    if ($params.status === 'ERROR') {
      // $this->flow_log("Error: " .$params['kpf_error'], "read_confirm");
      order.Error = $params.kpf_error;
      return;
    }
    if (!$params.kpf_orden) {
      throw new Error('Invalid response Orden number');
    }
    order.OrdenNumero = $params.kpf_orden;
    // $this->flow_log("Lee Numero Orden: " . $params['kpf_orden'], "read_confirm");
    if (!$params.kpf_monto) {
      throw new Error('Invalid response Amount');
    }
    order.Monto = $params.kpf_monto;
    // $this->flow_log("Lee Monto: " . $params['kpf_monto'], "read_confirm");
    if ($params.kpf_flow_order) {
      order.FlowNumero = $params.kpf_flow_order;
      // $this->flow_log("Lee Orden Flow: " . $params['kpf_flow_order'], "read_confirm");
    }
    if ($params.kpf_pagador) {
      order.Pagador = $params.kpf_pagador;
    }
  }

  function read_result(response) {
    if (!response) throw new Error('Respuesta invalida');

    const $params = queryStringToObject(response);

    if (!$params.s) {
      throw new Error('Respuesta invalida (Sin Firma)');
    }

    if (!flow_sign_validate($params.s, response)) {
      throw new Error('Firma invalida de Flow');
    }

    order.Comision = 'default'; // $flow_tasa_default;
    order.Status = '';
    order.Error = '';
    order.OrdenNumero = $params.kpf_orden;
    order.Concepto = $params.kpf_concepto;
    order.Monto = $params.kpf_monto;
    order.FlowNumero = $params.kpf_flow_order;
    order.Pagador = $params.kpf_pagador;
    // this.flow_log('Datos recuperados Orden de Compra N°: '.$params.kpf_orden, 'read_result');

    return order;
  }

  function build_response($result) {
    const $r = $result ? 'ACEPTADO' : 'RECHAZADO';
    const $data = { status: $r, c: config.FLOW_COMERCIO };
    const $q = objectToQueryString($data);
    const $s = flow_sign($q);

    return `${$q}&s=${$s}`;
  }

  return {
    new_order,
    read_confirm,
    read_result,
    build_response,
    getOrder: () => order,
    getConfig: () => config,
  };
}

module.exports = FlowAPI;
