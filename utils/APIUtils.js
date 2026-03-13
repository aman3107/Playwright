export class APIUtils {
  constructor(APIContext, loginPayload) {
    this.APIContext = APIContext;
    this.loginPayload = loginPayload;
  }
  async getLoginToken() {
    const response = await this.APIContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      },
    );
    const responseJson = await response.json();
    let token = responseJson.token;
    return token;
  }

  async getOrderId(orderPayload) {
    const orderResponse = await this.APIContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: await this.getLoginToken(),
          "Content-Type": "application/json",
        },
      },
    );

    const orderResponseJson = await orderResponse.json();
    let apiOrderId = orderResponseJson.orders[0];
    return apiOrderId;
  }
}
