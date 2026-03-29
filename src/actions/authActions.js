'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'src/data/users.json');

async function getUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function loginUser(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (email && password) {
    const users = await getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return { error: 'Credenciales inválidas o contraseña incorrecta' };
    }

    const cookieStore = await cookies();
    const sessionData = JSON.stringify({ email, name: user.name });
    cookieStore.set('velora_session', sessionData, { path: '/' });
    
    revalidatePath('/', 'layout');
    redirect('/account');
  }
  
  return { error: 'Por favor complete todos los campos' };
}

export async function registerUser(formData) {
  const email = formData.get('email');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const password = formData.get('password');
  
  if (email && firstName && password) {
    const users = await getUsers();
    
    // Check if exists
    if (!users.find(u => u.email === email)) {
      const newUser = {
        id: `USR-${Date.now().toString().slice(-3)}`,
        name: firstName,
        lastName: lastName || "",
        email: email,
        password: password,
        address: "Av. Libertador 1234, Piso 5, CABA", // Default for demo
        role: "Cliente Nuevo",
        joinedAt: new Date().toISOString().split('T')[0],
        status: "Suscripto",
        purchases: 0
      };
      users.push(newUser);
      await saveUsers(users);
    }

    const cookieStore = await cookies();
    const sessionData = JSON.stringify({ email, name: firstName });
    cookieStore.set('velora_session', sessionData, { path: '/' });
    
    revalidatePath('/', 'layout');
    redirect('/account');
  }
}

export async function getUserSession() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('velora_session')?.value;
  if (!sessionValue) return null;
  
  try {
    const session = JSON.parse(sessionValue);
    const users = await getUsers();
    const userInDb = users.find(u => u.email === (session.email || sessionValue));
    if (userInDb) {
      return { 
        email: userInDb.email, 
        name: userInDb.name, 
        lastName: userInDb.lastName,
        address: userInDb.address 
      };
    }
    return session;
  } catch(e) {
    return { name: sessionValue.split('@')[0], email: sessionValue };
  }
}

export async function updateUserProfile(formData) {
    const currentEmail = formData.get('currentEmail');
    const currentPassword = formData.get('currentPassword');
    
    const newName = formData.get('name');
    const newLastName = formData.get('lastName');
    const newEmail = formData.get('email');
    const newAddress = formData.get('address');
    const newPassword = formData.get('newPassword');

    const users = await getUsers();
    const userIndex = users.findIndex(u => u.email === currentEmail);
    
    if (userIndex === -1) return { error: 'Usuario no encontrado' };
    
    // Security Validation
    if (users[userIndex].password !== currentPassword) {
        return { error: 'La contraseña actual es incorrecta. No se pueden guardar los cambios.' };
    }

    // Update user
    users[userIndex].name = newName;
    users[userIndex].lastName = newLastName;
    users[userIndex].email = newEmail;
    users[userIndex].address = newAddress;
    
    if (newPassword && newPassword.trim() !== "") {
        users[userIndex].password = newPassword;
    }

    await saveUsers(users);

    // Update session cookie
    const cookieStore = await cookies();
    const sessionData = JSON.stringify({ email: newEmail, name: newName });
    cookieStore.set('velora_session', sessionData, { path: '/' });

    revalidatePath('/', 'layout');
    revalidatePath('/account');

    return { success: true, message: 'Perfil actualizado con éxito' };
}

export async function loginAdmin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  
  if (email === 'admin@velora.com' && password === 'admin123') {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', { path: '/' });
    revalidatePath('/', 'layout');
    redirect('/admin');
  }
  
  return { error: 'Acceso denegado. Credenciales incorrectas.' };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('velora_session');
  revalidatePath('/', 'layout');
  redirect('/account/login');
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  revalidatePath('/', 'layout');
  redirect('/admin/login');
}
