# People Analytics RH

Plataforma de People Analytics con dashboard dinámico, control de vacantes, plantilla, rotación, insights automáticos y analista inteligente.

## Inicio rápido

1. Copia `.env.example` a `.env` y configura PostgreSQL.
2. Instala dependencias: `pnpm install`
3. Crea esquema y datos de demo: `pnpm db:migrate && pnpm db:seed`
4. Inicia web: `pnpm dev` y API: `pnpm api`

La interfaz contiene datos demostrativos para que pueda evaluarse sin API activa. La API Express incorpora endpoints iniciales para dashboard, vacantes e insights. Prisma define una base relacional escalable con índices para filtros y métricas frecuentes.
