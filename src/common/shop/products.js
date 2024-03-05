const token = 'sk_test_56290c1603cc68a61b59eb003647fdb91940a2cdc5b31';

export async function getProducts() {
  try {
    const url = new URL(`https://api.chec.io/v1/products`);

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

export async function getProduct(productId) {
  try {
    const url = new URL(`https://api.chec.io/v1/products/${productId}`);

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
