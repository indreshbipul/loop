const addProduct = async (product) => {
    const response = await fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}
export default {
    addProduct
}