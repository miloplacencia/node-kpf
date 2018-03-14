const path = require('path');
const FlowApi = require('../src');
const { queryStringToObject: qs } = require('../src/helpers');

describe('Testing Flow API NodeJS', () => {
  let API;
  const flowDefault = {
    FLOW_URL_EXITO: 'https://campanil.super-dns.cl/api/reservas/pago-exito',
    FLOW_URL_FRACASO: 'https://campanil.super-dns.cl/api/reservas/pago-fracaso',
    FLOW_URL_CONFIRMACION:
      'https://campanil.super-dns.cl/api/reservas/pago-confirmacion',
    FLOW_URL_RETORNO: 'https://campanil.super-dns.cl',
    FLOW_URL_PAGO: 'http://flow.tuxpan.com/app/kpf/pago.php',
    FLOW_KEY: path.join(__dirname, './keys'),
    FLOW_LOGPATH: path.join(__dirname, './logs'),
    FLOW_COMERCIO: 'placenciameister@gmail.com',
    FLOW_TIPO_INTEGRACION: 'a',
  };

  const response_exito =
    'kpf_orden=16042011-27111987-06041988&kpf_concepto=Pago+Cositas+pedido%3A+16042011-27111987-06041988&kpf_monto=999999.00&kpf_pagador=milo@ciudadcolor.com&kpf_flow_order=26850&s=Ru60tjoAc7yNAYjQoI0bQi9fw7OfCOgWfSwjTfRrpdfSp4tlWLWZPeCb0xqPByllQqV6hWo0TsVoWna4balQMDgpgBOnFakztv%2BsTrkUacnkUfQfZsWY0yIxEQcTFS7Om1GHlUEioEdjRa2cDeHBFFUzqXTJQMFKwXaZGQthEAulL1W2r3sdBocgX3MPVqQv%2FGho3Hl0W2UyucgsfJ0F6Cs1b0a7eb8%2Br9LIEAAEFG9ndWwgXEUMyoKiqf8KJCYQsjlXhP74ymKCcdRQLqPAqPKxUtr7Y2cWyMGgUKoiV1JcxzdBImPzjnfEBJfEvTLaIn6HH5NR0CP9z6HMRkMND%2BVGaQdQ8vfAPsfP8CQ8j9KLQB5JNZB%2BzdVOatbdgBq3z2oUvYCeFHP4anY1MkrVBTK090lsCrjuduPmud7KDZjeoBmvLUWMRw0mhwCg8V5VlwqzgjWPSYyQNT%2BTMUvceNDubrtzfyUqX8XcGHabJtI4%2FhCU9qWdzmkhTWYqt%2FBrojGmRjJyqQMlVbFtaTJwPulzos%2FcI5oYKAmikjAhLD0v0bZf7qIs8HAZPYgXQRBz2n20phOBfzZBrABRTrM5pAf5TSNvbt89d%2FqJQbWUpiUdapvQVsqjOYQTO5ja2I%2FkpXThdXgSMYyQK16U6SyixbbU8DHsQhdzmRkM5cpCRKY%3D';
  const response_confirmar =
    'status=RECHAZADO&c=placenciameister%40gmail.com&s=O6RkFjAgaP9oeN6x9I4t8T5dprLBcmFra7es2BE8dGA33j7Bzyv2re9win8SK9BmbVCbEfkG1L+kv5XF6JLyCb3sya2cvDqjFHAZcdEV2068AOcRbzoPuVxMVGhy9BJDAARKFY2S7Y/zB9NtvMtStJH3IWgsDkJza/f4SthDO2xFtbS5a+c0Bi+5S+OttBElBdMn376VAa/8100O1G1rCMY93qPF93tjgNZ7Uwm+4i2PJSYIsUvbAYy0fL3Oi5wNxxh0h1S2U45993NIzUJbyy9aBuRjE3cUDwcrnjeL+Cwq0c6ErHKWLu6tNmPxYunvuR9RsNvJiVQNLp+NKZetlpbNR/u1T6jF/C+gORQz6fHrmh3JMKSBjOpPNQnqHixs/WgQ82xE641ih2FNTCW/j6of5sEgfknaYcBIL+OiLm0ZKas2/C8FBQXW0i+3EzJpGbu6mmCGphzaSs++uzN/HI6LCGaZ+nKPspzj39EyHV0mO+LikijHjaOeBWBPpD5oG4e9+TfPlMWI0QSrEcoMr9j7+TIs9VZ8PeVxLSodHGvVPdoYBda6ehuWVA+R/TqhVPMHJgqg9L0yhNigMAF1Fonx3pdDSe+rcmDupQ7k/fQpRyy5CkZSd2KGbpNgmwb4/xOyiZbMMUDJ4lZgn2fVqlPr1QIH7u32A6WvsikqWoc=';

  test('FlowApi()', () => {
    const api = FlowApi(flowDefault);

    expect(api.getConfig).toBeDefined();

    expect(api.getConfig().FLOW_COMERCIO).toBe(flowDefault.FLOW_COMERCIO);
    expect(api.getConfig().FLOW_KEY).toBe(flowDefault.FLOW_KEY);
    expect(api.getConfig().FLOW_LOGPATH).toBe(flowDefault.FLOW_LOGPATH);
    expect(api.getConfig().FLOW_MEDIOPAGO).toBe('9');
    expect(api.getConfig().FLOW_TIPO_INTEGRACION).toBe(
      flowDefault.FLOW_TIPO_INTEGRACION
    );
    expect(api.getConfig().FLOW_URL_CONFIRMACION).toBe(
      flowDefault.FLOW_URL_CONFIRMACION
    );
    expect(api.getConfig().FLOW_URL_EXITO).toBe(flowDefault.FLOW_URL_EXITO);
    expect(api.getConfig().FLOW_URL_FRACASO).toBe(flowDefault.FLOW_URL_FRACASO);
    expect(api.getConfig().FLOW_URL_PAGO).toBe(flowDefault.FLOW_URL_PAGO);
    expect(api.getConfig().FLOW_URL_RETORNO).toBe(flowDefault.FLOW_URL_RETORNO);

    expect(api.getOrder).toBeDefined();

    expect(api.new_order).toBeDefined();
    expect(api.read_confirm).toBeDefined();
    expect(api.read_result).toBeDefined();
    expect(api.build_response).toBeDefined();
  });

  test('FlowApi.new_order', () => {
    const { new_order } = FlowApi(flowDefault);
    const base_data = {
      orden_compra: '123123asdasd',
      monto: 123123,
      concepto: 'una comprita',
      email_pagador: 'mi@email.com',
      medio_pago: 'Non',
    };
    const order = new_order(base_data);

    expect(order).toBeDefined();

    const entries = Object.entries(qs(order));
    expect(entries[0][0]).toBe('c');
    expect(entries[0][1]).toBe('placenciameister@gmail.com');
    expect(entries[1][0]).toBe('oc');
    expect(entries[1][1]).toBe(base_data.orden_compra);
    expect(entries[2][0]).toBe('mp');
    expect(entries[2][1]).toBe('9');
    expect(entries[3][0]).toBe('m');
    expect(entries[3][1]).toBe(base_data.monto + '');
    expect(entries[4][0]).toBe('o');
    expect(entries[4][1]).toBe(base_data.concepto);
    expect(entries[5][0]).toBe('ue');
    expect(entries[5][1]).toBe(flowDefault.FLOW_URL_EXITO);
    expect(entries[6][0]).toBe('uf');
    expect(entries[6][1]).toBe(flowDefault.FLOW_URL_FRACASO);
    expect(entries[7][0]).toBe('uc');
    expect(entries[7][1]).toBe(flowDefault.FLOW_URL_CONFIRMACION);
    expect(entries[8][0]).toBe('ti');
    expect(entries[8][1]).toBe('a');
    expect(entries[9][0]).toBe('e');
    expect(entries[9][1]).toBe(base_data.email_pagador);
    expect(entries[10][0]).toBe('v');
    expect(entries[10][1]).toBe('kit_1_4');
    expect(entries[11][0]).toBe('ur');
    expect(entries[11][1]).toBe(flowDefault.FLOW_URL_RETORNO);
    expect(entries[12][0]).toBe('s');
    expect(entries[12][1]).toBeDefined();
  });

  describe('FlowApi.build_response', () => {
    test('build_response -> Exito', () => {
      const { build_response } = FlowApi(flowDefault);
      const response = build_response(true);
      expect(response).toBeDefined();

      const entries_exito = Object.entries(qs(response));
      expect(entries_exito[0][0]).toBe('status');
      expect(entries_exito[0][1]).toBe('ACEPTADO');
      expect(entries_exito[1][0]).toBe('c');
      expect(decodeURIComponent(entries_exito[1][1])).toBe(
        flowDefault.FLOW_COMERCIO
      );
      expect(entries_exito[2][0]).toBe('s');
      expect(entries_exito[2][1]).toBeDefined();
    });

    test('build_response -> Fallo', () => {
      const { build_response } = FlowApi(flowDefault);
      const response_rechazado = build_response(false);
      expect(response_rechazado).toBeDefined();

      const entries_error = Object.entries(qs(response_rechazado));
      expect(entries_error[0][0]).toBe('status');
      expect(entries_error[0][1]).toBe('RECHAZADO');
      expect(entries_error[1][0]).toBe('c');
      expect(decodeURIComponent(entries_error[1][1])).toBe(
        flowDefault.FLOW_COMERCIO
      );
      expect(entries_error[2][0]).toBe('s');
      expect(entries_error[2][1]).toBeDefined();
    });
  });
});
