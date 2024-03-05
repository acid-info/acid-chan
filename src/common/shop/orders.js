const token = 'sk_test_56290c1603cc68a61b59eb003647fdb91940a2cdc5b31';

export async function getOrders(email) {
  try {
    const url = new URL(`https://api.chec.io/v1/orders`);

    // const params = {
    //   query: `cart_id=cart_ypbroEWYe7l8n4`,
    // };

    // Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    const headers = {
      'X-Authorization': token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
