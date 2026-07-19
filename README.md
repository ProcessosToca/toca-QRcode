# Toca QR Code — Redes Sociais

Site simples com links para as redes sociais da Toca Imóveis (Instagram, Facebook e LinkedIn).

## Visualizar localmente

Abra o arquivo `index.html` diretamente no navegador, ou use um servidor local:

```bash
npx serve .
```

## Publicar no GitHub Pages

### 1. Criar o repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome sugerido: `toca-QRcode`
3. Deixe como **público** (GitHub Pages gratuito exige repositório público)
4. **Não** marque "Add a README" se você já tem o projeto local
5. Clique em **Create repository**

### 2. Enviar o código para o GitHub

No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Adiciona site de redes sociais Toca"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/toca-QRcode.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

### 3. Ativar o GitHub Pages

1. No GitHub, abra o repositório
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. Em **Branch**, escolha `main` e a pasta `/ (root)`
5. Clique em **Save**

Em alguns minutos, o site ficará disponível em:

```
https://SEU-USUARIO.github.io/toca-QRcode/
```

### 4. Atualizar o site depois

Sempre que fizer alterações:

```bash
git add .
git commit -m "Descrição da alteração"
git push
```

O GitHub Pages atualiza automaticamente em 1–3 minutos.

## Links das redes

| Rede     | URL |
|----------|-----|
| Instagram | https://www.instagram.com/tocaimoveis/ |
| Facebook  | https://www.facebook.com/toca.imoveis |
| LinkedIn  | https://www.linkedin.com/company/toca-administracao-de-imoveis |
