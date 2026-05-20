export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-50">
      <section className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900/80 p-10 shadow-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">
          EmprendeX
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Monorepo activo de backend y frontend.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
          El backend NestJS ya esta integrado en el workspace y el frontend web
          queda listo como base para continuar el desarrollo del producto.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-sm font-semibold text-zinc-200">Backend API</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              NestJS, PostgreSQL, TypeORM y Docker operados desde la raiz del
              repositorio.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-sm font-semibold text-zinc-200">Workspace</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Scripts unificados con `pnpm` y `turbo` para desarrollo,
              validacion y despliegue local.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
