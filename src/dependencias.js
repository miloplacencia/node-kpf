const htmlentities = require('locutus/php/strings/htmlentities');
const urlencode = require('locutus/php/url/urlencode');
const crypto = require('crypto');
const fs = require('fs');

module.exports.FlowSign = (prvkey = '') => (data = '') => {
  if (!prvkey) throw new Error('flow_sign: Clave Privada no encontrada');
  if (!data) throw new Error('flow_sign: Sin datos que firmar');

  const signature = crypto.createSign('SHA1');
  signature.update(data);
  return signature.sign(prvkey, 'base64');
};

module.exports.FlowSignValidate = (pubkey = '') => ($sign = '', $data = '') => {
  if (!pubkey)
    throw new Error('flow_sign_validate: Clave Pública no encontrada');
  if (!$sign) throw new Error('flow_sign_validate: Sin Firma');
  if (!$data) throw new Error('flow_sign_validate: Sin Datos');
  if (!$data.includes('&s='))
    throw new Error('flow_sign_validate: String Data invalida');

  const response = $data.split('&s=')[0];
  const signature = decodeURIComponent($sign);

  const verifier = crypto.createVerify('SHA1');
  verifier.update(response);
  return verifier.verify(pubkey, signature, 'base64');
};

module.exports.FlowPack = flowSign => ({
  config = FLOW_DEFAULT,
  order = ORDER_DEFAULT,
} = {}) => {
  if (!flowSign) throw new Error('Sin funcion para firmar');

  const tipo_integracion = urlencode(config.FLOW_TIPO_INTEGRACION);
  const comercio = urlencode(config.FLOW_COMERCIO);
  const orden_compra = urlencode(order.OrdenNumero);
  const monto = urlencode(order.Monto);
  const medioPago = urlencode(order.MedioPago);
  const email = urlencode(order.Pagador);

  let hConcepto = htmlentities(order.Concepto);
  if (!hConcepto) hConcepto = htmlentities(order.Concepto, 2, 'UTF-8');
  if (!hConcepto) hConcepto = htmlentities(order.Concepto, 2, 'ISO-8859-1');
  if (!hConcepto) hConcepto = `Orden de Compra ${orden_compra}`;
  const concepto = urlencode(hConcepto);

  const url_exito = urlencode(config.FLOW_URL_EXITO);
  const url_fracaso = urlencode(config.FLOW_URL_FRACASO);
  const url_retorno = urlencode(config.FLOW_URL_RETORNO);
  const url_confirmacion = urlencode(config.FLOW_URL_CONFIRMACION);

  const p = `c=${comercio}&oc=${orden_compra}&mp=${medioPago}&m=${monto}&o=${concepto}&ue=${url_exito}&uf=${url_fracaso}&uc=${url_confirmacion}&ti=${tipo_integracion}&e=${email}&v=kit_1_4&ur=${url_retorno}`;

  const signature = flowSign(p);
  return `${p}&s=${signature}`;
};

module.exports.getPubPrivKeys = (FLOW_KEY = '/keys') => {
  try {
    const prv_key = fs.readFileSync(`${FLOW_KEY}/comercio.pem`);
    const pub_key = fs.readFileSync(`${FLOW_KEY}/flow.pubkey`);

    return {
      prv_key,
      pub_key,
    };
  } catch (error) {
    throw new Error(error);
  }
};
