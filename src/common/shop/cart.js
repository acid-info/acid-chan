const token = 'sk_test_56290c1603cc68a61b59eb003647fdb91940a2cdc5b31';

export async function createCart() {
  try {
    const url = new URL(`https://api.chec.io/v1/carts`);

    const headers = {
      'X-Authorization': token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getCart(cartId) {
  try {
    const url = new URL(`https://api.chec.io/v1/carts/${cartId}`);

    const headers = {
      'X-Authorization': token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function addItemToCart(cartId, body) {
  try {
    const url = new URL(`https://api.chec.io/v1/carts/${cartId}`);

    const headers = {
      'X-Authorization': token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function removeItemFromCart(cartId, line_item_id) {
  try {
    const url = new URL(`https://api.chec.io/v1/carts/${cartId}/items/${line_item_id}`);

    const headers = {
      'X-Authorization': token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
