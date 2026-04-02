const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type OptinSignupPayload = {
  email: string
  platform: 'macOS' | 'Windows'
  source: string
  version: string
}

export function useEmailSignup() {
  const supabase = useSupabaseClient()
  const isSaving = ref(false)
  const emailSaved = ref(false)
  const saveError = ref('')

  function normalizeEmail(email: string): string {
    return email.trim().toLowerCase()
  }

  function validateEmail(email: string): string | null {
    if (!email) {
      return null
    }

    if (!EMAIL_PATTERN.test(email)) {
      return 'Enter a valid email address'
    }

    return null
  }

  const saveEmail = async ({
    email,
    platform,
    source,
    version,
  }: Omit<OptinSignupPayload, 'email'> & { email: string }): Promise<boolean> => {
    const normalizedEmail = normalizeEmail(email)
    const validationError = validateEmail(normalizedEmail)

    if (validationError) {
      saveError.value = validationError
      return false
    }

    if (!normalizedEmail) {
      saveError.value = ''
      emailSaved.value = false
      return false
    }

    isSaving.value = true
    saveError.value = ''

    try {
      const { error } = await supabase.from('optin_user_signup').insert({
        email: normalizedEmail,
        platform,
        source,
        version,
      })

      if (error) {
        console.error('Supabase error:', error)
        saveError.value = 'Could not save email. Download will still work.'
        emailSaved.value = false
        isSaving.value = false
        return false
      }
    } catch (e) {
      console.error('Save email error:', e)
      saveError.value = 'Could not save email. Download will still work.'
      emailSaved.value = false
      isSaving.value = false
      return false
    }

    emailSaved.value = true
    saveError.value = ''
    isSaving.value = false
    return true
  }

  const download = (downloadUrl: string) => {
    window.location.assign(downloadUrl)
  }

  return {
    isSaving: readonly(isSaving),
    emailSaved: readonly(emailSaved),
    saveError: readonly(saveError),
    saveEmail,
    download,
  }
}
