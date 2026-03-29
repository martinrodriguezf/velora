import catalogue from '@/data/catalogue.json';

export async function GET(request) {
  const headers = ['id', 'title', 'description', 'availability', 'condition', 'price', 'link', 'image_link', 'brand', 'google_product_category'];
  
  const rows = catalogue.map(product => {
    // Escaping comillas para formato CSV
    const escapeQuotes = (str) => `"${str.replace(/"/g, '""')}"`;
    
    // Asumiendo dominio estático en procucción, podriamos usar headers locales pero requerimos un link absoluto
    const baseUrl = 'https://velorafashion.com';
    
    return [
      product.id,
      escapeQuotes(product.title),
      escapeQuotes(product.description),
      product.availability,
      product.condition,
      `${product.price.toFixed(2)} USD`,
      `${baseUrl}${product.link}`,
      `${baseUrl}${product.image_link}`,
      product.brand,
      'Apparel & Accessories > Clothing'
    ].join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="facebook_catalog_velora.csv"'
    }
  });
}
