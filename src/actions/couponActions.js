"use server"

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const filePath = path.join(process.cwd(), 'src/data/coupons.json');

export async function createCoupon(formData) {
  const fileData = await fs.readFile(filePath, 'utf8');
  let coupons = JSON.parse(fileData);

  const rawCode = formData.get('code');
  const code = rawCode.trim().toUpperCase().replace(/\s+/g, '');
  
  if(coupons.find(c => c.code === code)) {
     return { error: 'El cupón ya existe.' };
  }

  const newCoupon = {
    code,
    discountPercent: parseInt(formData.get('discountPercent'), 10),
    expiresAt: formData.get('expiresAt')
  };

  coupons.push(newCoupon);

  await fs.writeFile(filePath, JSON.stringify(coupons, null, 2), 'utf8');
  revalidatePath('/admin/marketing');
  revalidatePath('/checkout');
  
  return { success: true };
}

export async function deleteCoupon(formData) {
  const fileData = await fs.readFile(filePath, 'utf8');
  let coupons = JSON.parse(fileData);
  
  const codeToDelete = formData.get('code');
  coupons = coupons.filter(c => c.code !== codeToDelete);
  
  await fs.writeFile(filePath, JSON.stringify(coupons, null, 2), 'utf8');
  revalidatePath('/admin/marketing');
  revalidatePath('/checkout');
  
  return { success: true };
}
