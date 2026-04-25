'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  SignUpSchema,
  SignInSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  type SignUpFormState,
  type SignInFormState,
  type ForgotPasswordFormState,
  type ResetPasswordFormState,
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

  // Validate redirectTo (same open-redirect rules as middleware)
  const rawRedirect = formData.get('redirectTo')?.toString() ?? ''
  const redirectTo =
    rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
      ? rawRedirect
      : '/author'

  // 2. Create pre-confirmed user via admin client (no email confirmation required)
  const adminSupabase = await createAdminClient()

  const { data: adminData, error: adminError } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: displayName },
  })

  if (adminError) {
    return {
      message: 'Unable to create account. Please try again.',
    }
  }

  // 3. Sign in to establish the session
  const supabase = await createClient()
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

  if (signInError) {
    return {
      message: 'Account created but sign-in failed. Please sign in manually.',
    }
  }

  // 4. Redirect to intended destination (profile is created by DB trigger on auth.users insert)
  revalidatePath('/', 'layout')
  redirect(redirectTo)
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

export async function requestPasswordReset(
  state: ForgotPasswordFormState,
  formData: FormData
): Promise<ForgotPasswordFormState> {
  const validatedFields = ForgotPasswordSchema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()

  // Always return success — never reveal whether the email exists
  await supabase.auth.resetPasswordForEmail(validatedFields.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  })

  return { success: true }
}

export async function resetPassword(
  state: ResetPasswordFormState,
  formData: FormData
): Promise<ResetPasswordFormState> {
  const validatedFields = ResetPasswordSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({
    password: validatedFields.data.password,
  })

  if (error) {
    return { message: 'Unable to reset password. Your link may have expired. Please request a new one.' }
  }

  revalidatePath('/', 'layout')
  redirect('/author')
}
