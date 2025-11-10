
# Pet Aqui — v2 

Frontend **React + TypeScript + Tailwind** com **login simulado**, **upload de imagem Base64**, **interações (interesse e avaliações)** e **persistência real** via **json-server**.


## Rodar a API
```bash
cd api
npx json-server --watch db.json --port 5174
```

## Rodar o app
```bash
cd web
npm i
npm i lucide-react
npm run dev

```
> Se aparecer erro de plugin do Vite: `npm i -D @vitejs/plugin-react`

## Variáveis (opcional)
Crie `.env` em `web` para apontar para uma API diferente:
```
VITE_API_URL=http://localhost:3333
```


