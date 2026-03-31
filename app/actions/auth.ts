'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createProfile } from '@/lib/dal/profiles'
import {
  SignUpSchema,
  SignInSchema,
  type SignUpFormState,
  type SignInFormState,
} from '@/lib/schemas/auth'

/**
 * Auth Server Actions
 *
 * SECURITY:
 * - Input validated with Zod BEFORE any DB/auth calls
 * - Server Actions are reachable via POST — always re-validate
 * - No sensitive data in return values
 * - Error messages are generic (no user-enumeration leaks)
 */

export async function signup(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  // 1. Validate input
  const validatedFields = SignUpSchema.safeParse({
    displayName: formData.get('displayName'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as SignUpFormState extends undefined ? never : NonNullable<SignUpFormState>['errors'],
    }
  }

  const { displayName, email, password } = validatedFields.data

  // 2. Create user with Supabase Auth
  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  })

  if (authError) {
    return {
      message: 'Unable to create account. Please try again.',
    }
  }

  // 3. Create profile in our profiles table
  if (authData.user) {
    await createProfile(authData.user.id, email, displayName)
  }

  // 4. Redirect to dashboard
  revalidatePath('/', 'layout')
  redirect('/author')
}

export async function signin(
  state: SignInFormState,
  formData: FormData
): Promise<SignInFormState> {
  // 1. Validate input
  const validatedFields = SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as SignInFormState extends undefined ? never : NonNullable<SignInFormState>['errors'],
    }
  }

  const { email, password } = validatedFields.data

  // 2. Sign in with Supabase Auth
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Generic message — never reveal whether email exists
    return {
      message: 'Invalid email or password.',
    }
  }

  // 3. Redirect to dashboard
  revalidatePath('/', 'layout')
  redirect('/author')
}

export async function signout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
