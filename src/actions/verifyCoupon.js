"use server"

import fs from 'fs/promises';
import path from 'path';

export async function verifyCouponCode(code) {
  const filePath = path.join(process.cwd(), 'src/data/coupons.json');
  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    const coupons = JSON.parse(fileData);
    const codeClean = code.trim().toUpperCase();
    
    const validCoupon = coupons.find(c => c.code === codeClean);
    if (!validCoupon) return { error: 'El cupón es inválido o no existe' };
    
    if (new Date(validCoupon.expiresAt) < new Date()) {
      return { error: 'Este cupón ha expirado' };
    }
    
    return { discountPercent: validCoupon.discountPercent };
  } catch (err) {
    return { error: 'Error del servidor al validar' };
  }
}
