"use server"

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const filePath = path.join(process.cwd(), 'src/data/categories.json');

export async function getCategories() {
  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (e) {
    return [];
  }
}

export async function saveCategory(formData) {
  const categories = await getCategories();
  const idValue = formData.get('id').toLowerCase().replace(/\s+/g, '-');
  const nameValue = formData.get('name');
  const isEdit = formData.get('_isEdit') === 'true';

  if (isEdit) {
    const index = categories.findIndex(c => c.id === idValue);
    if (index !== -1) categories[index].name = nameValue;
  } else {
    // Basic check for duplicates
    if (!categories.find(c => c.id === idValue)) {
      categories.push({ id: idValue, name: nameValue });
    }
  }

  await fs.writeFile(filePath, JSON.stringify(categories, null, 2), 'utf8');
  revalidatePath('/admin/categories');
  revalidatePath('/shop');
  redirect('/admin/categories');
}

export async function deleteCategory(id) {
  let categories = await getCategories();
  categories = categories.filter(c => c.id !== id);
  await fs.writeFile(filePath, JSON.stringify(categories, null, 2), 'utf8');
  revalidatePath('/admin/categories');
  revalidatePath('/shop');
}
