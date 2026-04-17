import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export function useCodeCopy() {
  const copiedId = ref<string | null>(null)

  const addCopyButtons = async () => {
    await nextTick()
    const preElements = document.querySelectorAll('article pre')
    preElements.forEach((pre, index) => {
      if (pre.querySelector('.copy-btn')) return

      const code = pre.querySelector('code')
      if (!code) return

      const id = `code-${index}`
      pre.id = id
      pre.style.position = 'relative'

      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`
      btn.title = 'Copy code'
      btn.className += ' absolute top-2 right-2 min-w-[44px] min-h-[44px] p-2 rounded-md bg-neutral-200 dark:bg-neutral-700 border border-transparent cursor-pointer opacity-0 transition-opacity flex items-center justify-center'

      btn.addEventListener('click', async () => {
        const text = code.textContent || ''
        await navigator.clipboard.writeText(text)
        copiedId.value = id
        btn.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
        btn.classList.add('bg-primary-500', 'text-white')
        btn.classList.remove('bg-neutral-200', 'dark:bg-neutral-700')
        setTimeout(() => {
          copiedId.value = null
          btn.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`
          btn.classList.remove('bg-primary-500', 'text-white')
          btn.classList.add('bg-neutral-200', 'dark:bg-neutral-700')
        }, 2000)
      })

      pre.appendChild(btn)

      pre.addEventListener('mouseenter', () => {
        btn.style.opacity = '1'
      })
      pre.addEventListener('mouseleave', () => {
        btn.style.opacity = '0'
      })
    })
  }

  onMounted(() => {
    addCopyButtons()
  })

  return { copiedId }
}
