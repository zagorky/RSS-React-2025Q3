import { revalidateTag } from 'next/cache';

export async function invalidateCacheByTag(tag: string) {
  'use server';

  revalidateTag(tag);
}