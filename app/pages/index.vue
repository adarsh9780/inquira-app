<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 antialiased">
    <AppNavbar />

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-blue-100/50 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div class="mx-auto max-w-6xl px-6">
        <div class="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div class="text-center lg:text-left">
            <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              Privacy-First AI
            </div>

            <h1 class="mb-6 font-sans text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Local AI Data Analysis<br />
              <span class="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">That Never Leaves Your Machine</span>
            </h1>

            <p class="mx-auto mb-8 max-w-lg text-lg text-gray-600 lg:mx-0">
              Ask questions about your data in natural language. Inquira generates Python scripts, executes them locally, and delivers insights—all while keeping your sensitive data 100% private.
            </p>

            <div class="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a href="#download" class="btn w-full rounded-lg px-6 py-3 text-base font-medium sm:w-auto">
                Download Free
              </a>
              <NuxtLink to="/docs" class="btn w-full rounded-lg px-6 py-3 text-base font-medium sm:w-auto">
                Read Docs
              </NuxtLink>
            </div>

            <div class="mt-12 flex items-center justify-center gap-12 lg:justify-start">
              <div>
                <div class="text-2xl font-bold text-gray-900">100%</div>
                <div class="text-sm text-gray-500">Local Processing</div>
              </div>
              <div class="h-8 w-px bg-gray-200"></div>
              <div>
                <div class="text-2xl font-bold text-gray-900">0</div>
                <div class="text-sm text-gray-500">Cloud Dependencies</div>
              </div>
              <div class="h-8 w-px bg-gray-200"></div>
              <div>
                <div class="text-2xl font-bold text-gray-900">DuckDB</div>
                <div class="text-sm text-gray-500">Powered Engine</div>
              </div>
            </div>
          </div>

          <div class="flex justify-center lg:justify-end">
            <svg class="h-64 w-64 lg:h-80 lg:w-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
                </linearGradient>
                <filter id="hero-glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <rect x="18" y="18" width="164" height="164" fill="#0f172a" rx="34" />
              <g transform="translate(100, 100)" filter="url(#hero-glow)">
                <circle r="24" fill="url(#hero-grad)" />
                <g>
                  <circle cx="70" cy="0" r="12" fill="#3b82f6" opacity="0.9">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
                  </circle>
                  <line x1="24" y1="0" x2="58" y2="0" stroke="url(#hero-grad)" stroke-width="4">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
                  </line>
                </g>
                <g transform="rotate(120)">
                  <circle cx="70" cy="0" r="12" fill="#f97316" opacity="0.9">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
                  </circle>
                  <line x1="24" y1="0" x2="58" y2="0" stroke="url(#hero-grad)" stroke-width="4">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
                  </line>
                </g>
                <g transform="rotate(240)">
                  <circle cx="70" cy="0" r="12" fill="#fb923c" opacity="0.9">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
                  </circle>
                  <line x1="24" y1="0" x2="58" y2="0" stroke="url(#hero-grad)" stroke-width="4">
                    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
                  </line>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="bg-gray-50 py-20 lg:py-32">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mb-16 text-center">
          <div class="mb-4 text-sm font-medium uppercase tracking-wider text-blue-600">Core Features</div>
          <h2 class="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need for Local AI Analysis
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600">
            A complete desktop application that combines the power of AI with absolute data privacy.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="mb-2 font-sans text-lg font-semibold text-gray-900">Autonomous AI-Assisted Analysis</h3>
            <p class="text-gray-600">Translate natural language prompts into Python workflows. The AI independently executes them and returns answers, charts, and insights.</p>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3 class="mb-2 font-sans text-lg font-semibold text-gray-900">Local Python Execution</h3>
            <p class="text-gray-600">Bundled Jupyter kernel running locally. AI generates exact installation commands for new packages, keeping your environment secure.</p>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
              </svg>
            </div>
            <h3 class="mb-2 font-sans text-lg font-semibold text-gray-900">Seamless Local Data Handling</h3>
            <p class="text-gray-600">Connect to Excel, CSV, JSON, and Parquet files. Dynamically converted into fast DuckDB workspaces for analyzing data of any size.</p>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <h3 class="mb-2 font-sans text-lg font-semibold text-gray-900">Integrated Code Editor</h3>
            <p class="text-gray-600">Full control with built-in code editor with autocomplete. Manually tweak AI-generated code and debug in a dedicated error pane.</p>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="mb-2 font-sans text-lg font-semibold text-gray-900">Interactive Visualization</h3>
            <p class="text-gray-600">Explore Plotly charts instantly. AG Grid with streaming backend handles up to 2000 rows at a time for massive datasets.</p>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="mb-2 font-sans text-lg font-semibold text-gray-900">Flawless Resume & Persistence</h3>
            <p class="text-gray-600">Intermediate variables, artifacts, and results are saved continuously. Close the app and resume exactly where you left off.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="py-20 lg:py-32">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mb-16 text-center">
          <div class="mb-4 text-sm font-medium uppercase tracking-wider text-blue-600">How It Works</div>
          <h2 class="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Three Steps to AI-Powered Insights
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600">
            From raw data to actionable insights in minutes, not hours.
          </p>
        </div>

        <div class="relative">
          <div class="absolute left-1/2 top-16 h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-blue-200 via-orange-200 to-indigo-200 hidden lg:block"></div>
          <div class="grid gap-12 lg:grid-cols-3">
            <div class="text-center">
              <div class="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-orange-500 text-xl font-bold text-white shadow-lg shadow-blue-500/25">
                1
              </div>
              <h3 class="mb-2 font-sans text-xl font-semibold text-gray-900">Drop Your Data</h3>
              <p class="text-gray-600">Import CSV, Excel, Parquet, or JSON files. Inquira instantly creates a local DuckDB workspace.</p>
            </div>

            <div class="text-center">
              <div class="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-orange-500 text-xl font-bold text-white shadow-lg shadow-orange-500/25">
                2
              </div>
              <h3 class="mb-2 font-sans text-xl font-semibold text-gray-900">Ask in Plain English</h3>
              <p class="text-gray-600">Type your question naturally. The AI understands your intent and generates the appropriate analysis code.</p>
            </div>

            <div class="text-center">
              <div class="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-orange-500 text-xl font-bold text-white shadow-lg shadow-orange-500/25">
                3
              </div>
              <h3 class="mb-2 font-sans text-xl font-semibold text-gray-900">Get Results</h3>
              <p class="text-gray-600">Watch the AI execute code locally and return charts, tables, and natural language explanations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section v-if="showPricing" id="pricing" class="bg-gray-50 py-20 lg:py-32">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mb-16 text-center">
          <div class="mb-4 text-sm font-medium uppercase tracking-wider text-blue-600">Pricing</div>
          <h2 class="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Three Editions, One Mission
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600">
            From individual users to enterprise teams, there's an Inquira edition for everyone.
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <div class="rounded-2xl border border-gray-200 bg-white p-8">
            <h3 class="mb-2 font-sans text-xl font-semibold text-gray-900">Free</h3>
            <p class="mb-6 text-gray-600">Core desktop experience for individuals.</p>
            <ul class="mb-8 space-y-3">
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                No forced login for basic usage
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Single-workspace experience
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Local DuckDB engine
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                AI code generation
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Interactive visualizations
              </li>
            </ul>
            <a href="#download" class="btn block w-full rounded-lg px-6 py-3 text-center text-sm font-medium">
              Download Free
            </a>
          </div>

          <div class="relative rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-xl shadow-blue-500/10">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 px-4 py-1 text-xs font-medium text-white">
              Most Popular
            </div>
            <h3 class="mb-2 font-sans text-xl font-semibold text-gray-900">Pro</h3>
            <p class="mb-6 text-gray-600">Advanced workflows for power users.</p>
            <ul class="mb-8 space-y-3">
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Everything in Free
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                RAG support
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Multiple workspaces
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Priority support
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Advanced visualization themes
              </li>
            </ul>
            <a href="#download" class="btn block w-full rounded-lg px-6 py-3 text-center text-sm font-medium">
              Get Pro
            </a>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-8">
            <h3 class="mb-2 font-sans text-xl font-semibold text-gray-900">Enterprise</h3>
            <p class="mb-6 text-gray-600">Pro plus organizational integration.</p>
            <ul class="mb-8 space-y-3">
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Everything in Pro
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Data connectors
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                MCP support
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Team collaboration
              </li>
              <li class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Custom integrations
              </li>
            </ul>
            <a href="mailto:enterprise@inquiraai.com" class="btn block w-full rounded-lg px-6 py-3 text-center text-sm font-medium">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Download CTA -->
    <section id="download" class="relative overflow-hidden py-20 lg:py-32">
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-blue-100/50 to-orange-100/30 rounded-full blur-3xl"></div>
      </div>

      <div class="mx-auto max-w-6xl px-6 text-center">
        <h2 class="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Download Inquira Today
        </h2>
        <p class="mx-auto mb-6 max-w-2xl text-lg text-gray-600">
          Available for macOS and Windows. Your data stays on your machine.
        </p>

        <div class="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <div class="mb-4 text-left">
            <label for="email-signup" class="block text-sm font-medium text-gray-700 mb-1">
              Email for product updates <span class="text-gray-400">(optional)</span>
            </label>
            <input
              id="email-signup"
              v-model="email"
              type="email"
              placeholder="you@company.com"
              class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <p class="mt-1.5 text-xs text-gray-500 text-left">
              Enter your email to receive product updates. Download will proceed regardless.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              class="group rounded-xl border border-gray-200 bg-white px-5 py-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300/60"
              @click="openMacInstallDialog"
            >
              <div class="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-gray-900">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.37 12.44c.02 2.46 2.16 3.28 2.18 3.29-.02.06-.34 1.17-1.12 2.32-.67 1-1.37 2-2.46 2.02-1.07.02-1.42-.64-2.65-.64-1.24 0-1.62.62-2.62.66-1.04.04-1.83-1.05-2.5-2.04-1.37-1.98-2.42-5.59-1.01-8.03.7-1.2 1.95-1.96 3.3-1.98 1.03-.02 2 .69 2.65.69.65 0 1.87-.85 3.16-.73.54.02 2.06.22 3.04 1.66-.08.05-1.82 1.06-1.8 2.78Zm-2.13-5.07c.56-.68.94-1.64.84-2.58-.81.03-1.79.54-2.37 1.22-.52.6-.98 1.57-.86 2.5.91.07 1.83-.46 2.39-1.14Z"/>
                </svg>
              </div>
              <div class="text-base font-semibold text-gray-900">
                Download for macOS
              </div>
              <p class="mt-1 text-sm text-gray-600">
                Opens the guided installer instructions with the shell command.
              </p>
            </button>

            <button
              type="button"
              class="btn flex min-h-[148px] flex-col items-start justify-center gap-3 rounded-xl px-5 py-4 text-left"
              @click="handleWindowsDownload"
            >
              <div class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 5.5L10.5 4.4v7.1H3V5.5Zm8.5-1.22L21 3v8.5h-9.5V4.28ZM3 12.5h7.5v7.1L3 18.5v-6Zm8.5 0H21V21l-9.5-1.33V12.5Z"/>
                </svg>
              </div>
              <div class="text-base font-semibold text-white">
                Download for Windows
              </div>
              <p class="text-sm text-white/80">
                Direct installer download.
              </p>
            </button>
          </div>

          <p class="mt-4 text-xs text-gray-500">
            macOS uses a guided shell installer for now because the app is not yet signed and notarized.
          </p>

          <p class="mt-4 text-xs text-gray-400">
            <a href="https://github.com/adarsh9780/inquira-ce" target="_blank" class="underline hover:text-gray-600">View source on GitHub</a>
          </p>
          <p class="mt-2 text-xs text-gray-500">
            <NuxtLink to="/docs/getting-started/distribution" class="underline hover:text-gray-700">
              Read how desktop distribution works
            </NuxtLink>
          </p>
        </div>
      </div>

      <Teleport to="body">
        <div
          v-if="isMacInstallDialogOpen"
          class="fixed inset-0 z-50 overflow-y-auto px-6 py-10"
          @click.self="closeMacInstallDialog"
        >
          <div class="fixed inset-0 bg-black/45 backdrop-blur-sm" @click="closeMacInstallDialog"></div>
          <div class="relative mx-auto mt-[6vh] w-full max-w-2xl">
            <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              <div class="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
                <div class="text-left">
                  <p class="text-sm font-medium uppercase tracking-[0.18em] text-amber-600">
                    macOS Install
                  </p>
                  <h3 class="mt-1 text-2xl font-semibold text-gray-900">
                    Guided shell installer
                  </h3>
                  <p class="mt-2 max-w-xl text-sm text-gray-600">
                    This keeps the Homebrew setup transparent and asks before it removes the quarantine flag that macOS may attach to the app.
                  </p>
                </div>
                <button
                  type="button"
                  class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                  aria-label="Close macOS install instructions"
                  @click="closeMacInstallDialog"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div class="space-y-5 px-6 py-6 text-left">
                <div class="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                  <p class="text-sm font-medium text-gray-900">
                    What the script does
                  </p>
                  <ul class="mt-3 space-y-2 text-sm text-gray-700">
                    <li>Installs Homebrew if your Mac does not already have it.</li>
                    <li>Taps `adarsh9780/inquira` and installs the `inquira` Homebrew cask.</li>
                    <li>Asks before running `xattr -dr` on `/Applications/Inquira.app` if you want help with macOS quarantine.</li>
                    <li>Leaves future upgrades to Homebrew with `brew upgrade --cask inquira`.</li>
                  </ul>
                </div>

                <div>
                  <p class="mb-3 text-sm font-medium text-gray-900">
                    Run this command in Terminal
                  </p>
                  <div class="relative rounded-xl bg-gray-950 px-4 py-4 pr-14 font-mono text-sm text-white">
                    <button
                      type="button"
                      class="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                      :aria-label="macInstallCopied ? 'macOS install command copied' : 'Copy macOS install command'"
                      @click="handleMacInstallCopy"
                    >
                      <svg
                        v-if="!macInstallCopied"
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <svg
                        v-else
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </button>
                    <span class="block leading-relaxed">
                      {{ macInstallCommand }}
                    </span>
                  </div>
                </div>

                <div class="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <p class="text-sm font-medium text-gray-900">
                    Future notarization plan
                  </p>
                  <p class="mt-2 text-sm text-gray-600">
                    We plan to move to proper signed and notarized macOS distribution once the project has sustainable support to cover Apple’s developer program costs responsibly. Until then, we are keeping the source public and the install flow explicit.
                  </p>
                </div>

                <div class="flex flex-col gap-3 border-t border-gray-100 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <NuxtLink to="/docs/getting-started/distribution" class="text-sm font-medium text-gray-600 underline hover:text-gray-900">
                    Read the full distribution note
                  </NuxtLink>
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                    @click="handleMacInstallCopy"
                  >
                    {{ macInstallCopied ? 'Copied install command' : 'Copy install command' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-100 bg-white py-12">
      <div class="mx-auto max-w-6xl px-6">
        <div class="grid gap-8 md:grid-cols-4">
          <div>
            <a href="#" class="flex items-center gap-3">
              <AppLogo />
            </a>
            <p class="mt-4 text-sm text-gray-600">Privacy-first, local AI data analysis. Your data never leaves your machine.</p>
          </div>

          <div>
            <h4 class="mb-4 text-sm font-semibold text-gray-900">Documentation</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/docs" class="text-sm text-gray-600 hover:text-gray-900">Overview</NuxtLink></li>
              <li><NuxtLink to="/docs/architecture" class="text-sm text-gray-600 hover:text-gray-900">Architecture</NuxtLink></li>
              <li><NuxtLink to="/docs/getting-started/installation" class="text-sm text-gray-600 hover:text-gray-900">Getting Started</NuxtLink></li>
              <li><NuxtLink to="/docs/roadmap" class="text-sm text-gray-600 hover:text-gray-900">Roadmap</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="mb-4 text-sm font-semibold text-gray-900">Community</h4>
            <ul class="space-y-2">
              <li><a href="https://github.com/adarsh9780/inquira-ce" target="_blank" class="text-sm text-gray-600 hover:text-gray-900">GitHub</a></li>
              <li><a href="https://github.com/adarsh9780/inquira-ce/issues" target="_blank" class="text-sm text-gray-600 hover:text-gray-900">Issues</a></li>
              <li><a href="https://github.com/adarsh9780/inquira-ce/discussions" target="_blank" class="text-sm text-gray-600 hover:text-gray-900">Discussions</a></li>
            </ul>
          </div>

          <div>
            <h4 class="mb-4 text-sm font-semibold text-gray-900">Legal</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/docs/legal/privacy" class="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</NuxtLink></li>
              <li><NuxtLink to="/docs/legal/terms" class="text-sm text-gray-600 hover:text-gray-900">Terms of Service</NuxtLink></li>
              <li><NuxtLink to="/docs/contributing" class="text-sm text-gray-600 hover:text-gray-900">Contributing</NuxtLink></li>
            </ul>
          </div>
        </div>

        <div class="mt-12 border-t border-gray-100 pt-8 text-center">
          <p class="text-sm text-gray-500">Copyright © 2026 Inquira CE (Alpha).</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { getDownloadUrl, isPricingEnabled, normalizeDownloadManifest } from '~/utils/publicDownloads.js'

const config = useRuntimeConfig()
const showPricing = computed(() => isPricingEnabled(config.public.showPricing))
const downloadsManifestUrl = computed(() =>
  String(config.public.downloadsManifestUrl || 'https://downloads.inquiraai.com/latest.json')
)

const { data: publicDownloadManifest } = await useAsyncData(
  'public-download-manifest',
  async () => {
    try {
      const manifest = await $fetch(downloadsManifestUrl.value)
      return normalizeDownloadManifest(manifest)
    } catch (error) {
      console.error('Could not load public download manifest:', error)
      return normalizeDownloadManifest(null)
    }
  },
)

const downloadManifest = computed(() =>
  publicDownloadManifest.value ?? normalizeDownloadManifest(null)
)

const { saveEmail, download } = useEmailSignup()

const email = ref('')
const DOWNLOAD_SOURCE = 'inquira-acc-landing-page'
const macInstallCommand = 'curl -fsSL https://inquiraai.com/install.sh | bash'
const macInstallCopied = ref(false)
const isMacInstallDialogOpen = ref(false)

const openMacInstallDialog = () => {
  isMacInstallDialogOpen.value = true
}

const closeMacInstallDialog = () => {
  isMacInstallDialogOpen.value = false
}

async function saveOptionalEmail(platform: 'macOS' | 'Windows') {
  if (email.value) {
    await saveEmail({
      email: email.value,
      platform,
      source: DOWNLOAD_SOURCE,
      version: downloadManifest.value.version,
    })
  }
}

async function handleMacInstallCopy() {
  await saveOptionalEmail('macOS')
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(macInstallCommand)
  }
  macInstallCopied.value = true
  window.setTimeout(() => {
    macInstallCopied.value = false
  }, 2000)
}

async function handleWindowsDownload() {
  await saveOptionalEmail('Windows')
  const downloadUrl = getDownloadUrl(downloadManifest.value, 'Windows')
  download(downloadUrl)
}
</script>

<style>
::selection {
  background: linear-gradient(135deg, #3b82f6, #f97316);
  color: white;
}

::-moz-selection {
  background: linear-gradient(135deg, #3b82f6, #f97316);
  color: white;
}
</style>
