const FLOW_DEFAULT = {
  FLOW_URL_EXITO: 'http://www.comercio.cl/kpf/exito.php',
  FLOW_URL_FRACASO: 'http://www.comercio.cl/kpf/fracaso.php',
  FLOW_URL_CONFIRMACION: 'http://www.comercio.cl/kpf/confirma.php',
  FLOW_URL_RETORNO: 'http://www.comercio.cl',
  FLOW_URL_PAGO: 'http://flow.tuxpan.com/app/kpf/pago.php',
  FLOW_KEY: '/keys',
  FLOW_LOGPATH: '/logs',
  FLOW_COMERCIO: 'emailFlow@comercio.com',
  FLOW_MEDIOPAGO: '9',
  FLOW_TIPO_INTEGRACION: 'f',
};

const ORDER_DEFAULT = {
  OrdenNumero: '',
  Concepto: '',
  Monto: '',
  MedioPago: FLOW_DEFAULT.FLOW_MEDIOPAGO,
  FlowNumero: '',
  Pagador: '',
  Status: '',
  Error: '',
};

module.exports = {
  FLOW_DEFAULT,
  ORDER_DEFAULT,
};
