'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const storefrontFilePath = path.join(process.cwd(), 'src/data/storefront.json');

export async function updateStorefront(formData) {
  try {
    // Leer el archivo actual para mantener la estructura (como items de values)
    const fileContents = await fs.readFile(storefrontFilePath, 'utf8');
    const currentData = JSON.parse(fileContents);
    
    // Extraer datos del formData
    const newStorefront = {
      marketing: {
        active: formData.get('marketingActive') === 'on',
        banner_text: formData.get('bannerText'),
        popup_title: formData.get('popupTitle'),
        popup_desc: formData.get('popupDesc')
      },
      featured_products: formData.getAll('featuredProducts'),
      hero: {
        title: formData.get('heroTitle'),
        subtitle: formData.get('heroSubtitle'),
        image: formData.get('heroImage')
      },
      values: {
        title: formData.get('valuesTitle'),
        image: formData.get('valuesImage'),
        items: [
          {
            title: formData.get('itemTitle0'),
            description: formData.get('itemDesc0')
          },
          {
            title: formData.get('itemTitle1'),
            description: formData.get('itemDesc1')
          },
          {
            title: formData.get('itemTitle2'),
            description: formData.get('itemDesc2')
          }
        ]
      }
    };
    
    // Escribir archivo
    await fs.writeFile(storefrontFilePath, JSON.stringify(newStorefront, null, 2), 'utf8');
    
    // Limpiar caché de la home
    revalidatePath('/');
    revalidatePath('/admin/storefront');
    
    return { success: true, message: 'Storefront actualizado correctamente' };
  } catch (error) {
    console.error('Error updating storefront:', error);
    return { success: false, error: 'Hubo un problema actualizando el storefront' };
  }
}
