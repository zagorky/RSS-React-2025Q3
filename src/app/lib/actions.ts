'use server';
import { revalidateTag } from 'next/cache';

export async function invalidateCacheByTag(tag: string) {
  revalidateTag(tag);
}
