import axios from 'axios';
import * as qs from 'qs';
import { website_url } from '../../../config/constants';

class PaypalHelper {
  public async createOrder(id, gems, bonus, price, uuid, partnerCode, discount): Promise<Object> {
    try {
      const res = await axios.post(
        this.getUrl(2, 'checkout/orders'),
        {
          intent: 'CAPTURE',
          application_context: {
            return_url: `${website_url}/thanks`,
            cancel_url: website_url,
            brand_name: 'PoudlardRP',
            locale: 'fr-FR',
            landing_page: 'BILLING',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'CONTINUE',
          },
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: price.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: price.toString(),
                  },
                },
              },
              payee: { email_address: 'tresorier.pdrp@gmail.com' },
              payment_instruction: {
                disbursement_mode: 'INSTANT',
              },
              description: `${gems + bonus} Gemmes ${
                discount ? `-${discount} avec le code ${partnerCode}` : ''
              }`,
              custom_id: uuid + ':' + (gems + bonus),
              items: [
                {
                  name: `${gems + bonus} Gemmes ${
                    discount ? `-${discount} avec le code ${partnerCode}` : ''
                  }`,
                  unit_amount: {
                    currency_code: 'EUR',
                    value: price.toString(),
                  },
                  quantity: '1',
                  description: `${id};${partnerCode}`,
                  category: 'DIGITAL_GOODS',
                },
              ],
            },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer ' + (await this.getPaypalToken()),
          },
        }
      );
      return res.data;
    } catch (e) {
      console.log(e.response.statusText);
    }
  }

  public async capturePayment(orderId): Promise<boolean> {
    try {
      const res = await axios.post(
        this.getUrl(2, `checkout/orders/${orderId}/capture`),
        {},
        {
          headers: {
            Authorization: 'Bearer ' + (await this.getPaypalToken()),
          },
        }
      );

      return res.data['status'] == 'COMPLETED';
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async verifyWebhook(body, headers: []): Promise<boolean> {
    try {
      const res = await axios.post(
        this.getUrl(1, 'notifications/verify-webhook-signature'),
        {
          auth_algo: headers['paypal-auth-algo'],
          cert_url: headers['paypal-cert-url'],
          transmission_id: headers['paypal-transmission-id'],
          transmission_sig: headers['paypal-transmission-sig'],
          transmission_time: headers['paypal-transmission-time'],
          webhook_id: process.env.SHOP_PAYPAL_WEBHOOK_ID,
          webhook_event: body,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + (await this.getPaypalToken()),
          },
        }
      );
      return res.data.verification_status === 'SUCCESS';
    } catch {
      return false;
    }
  }

  private getUrl(version: number, action: string): string {
    return `https://api-m${
      process.env.PAYMENT_ENV == 'prod' ? '' : '.sandbox'
    }.paypal.com/v${version}/${action}`;
  }

  private async getPaypalToken(): Promise<string> {
    try {
      const res = await axios.post(
        this.getUrl(1, 'oauth2/token'),
        qs.stringify({ grant_type: 'client_credentials' }),
        {
          headers: {
            Authorization:
              'Basic ' +
              Buffer.from(
                process.env.SHOP_PAYPAL_CLIENTID + ':' + process.env.SHOP_PAYPAL_SECRET
              ).toString('base64'),
          },
        }
      );
      return res.data['access_token'];
    } catch {
      return null;
    }
  }
}

export default PaypalHelper;
