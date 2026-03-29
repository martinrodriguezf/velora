"use server"

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const filePath = path.join(process.cwd(), 'src/data/catalogue.json');

export async function saveProduct(formData) {
  const fileData = await fs.readFile(filePath, 'utf8');
  let catalogue = JSON.parse(fileData);

  const rawId = formData.get('id');
  const isEdit = formData.get('_isEdit') === 'true';
  const rawCompareP = formData.get('compare_at_price');
  
  // Parse JSON data from custom editors
  let additionalImages = [];
  try {
    additionalImages = JSON.parse(formData.get('additional_image_links') || '[]');
  } catch(e) { additionalImages = []; }

  let sizeGuide = null;
  try {
    sizeGuide = JSON.parse(formData.get('size_guide') || 'null');
  } catch(e) { sizeGuide = null; }

  const product = {
    id: rawId,
    title: formData.get('title'),
    description: formData.get('description'),
    price: parseFloat(formData.get('price')) || 0,
    compare_at_price: rawCompareP ? parseFloat(rawCompareP) : null,
    promo_text: formData.get('promo_text'),
    status: formData.get('status') || 'active',
    condition: 'new',
    availability: formData.get('availability'),
    link: `/product/${rawId.toLowerCase()}`,
    image_link: formData.get('image_link'),
    additional_image_links: additionalImages,
    size_guide: sizeGuide,
    brand: 'Velora',
    category: formData.get('category'),
    sizes: formData.get('sizes') ? formData.get('sizes').split(',').map(s=>s.trim()) : [],
    color: formData.get('color'),
    fit: formData.get('fit'),
    composition: formData.get('composition'),
    model_info: formData.get('model_info'),
    badges: formData.get('badges') ? formData.get('badges').split(',').map(s=>s.trim()).filter(Boolean) : []
  };

  const index = catalogue.findIndex(p => p.id === rawId);
  if (index !== -1) {
    catalogue[index] = { ...catalogue[index], ...product };
  } else {
    catalogue.push(product);
  }

  await fs.writeFile(filePath, JSON.stringify(catalogue, null, 2), 'utf8');

  revalidatePath('/');
  revalidatePath('/shop');
  revalidatePath(`/product/${rawId.toLowerCase()}`);
  revalidatePath('/admin/products');
  
  redirect('/admin/products');
}

export async function archiveProduct(id) {
  const fileData = await fs.readFile(filePath, 'utf8');
  let catalogue = JSON.parse(fileData);
  
  const index = catalogue.findIndex(p => p.id === id);
  if (index !== -1) {
    catalogue[index].status = 'archived';
    await fs.writeFile(filePath, JSON.stringify(catalogue, null, 2), 'utf8');
    
    revalidatePath('/');
    revalidatePath('/shop');
    revalidatePath(`/product/${id.toLowerCase()}`);
    revalidatePath('/admin/products');
  }
  
  redirect('/admin/products');
}
