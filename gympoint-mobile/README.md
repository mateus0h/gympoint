### GYM Point Mobile

## Pré requisitos

- Git [Git](https://git-scm.com)
- Node.js [Node.js v10.16.3](https://nodejs.org/)
- Yarn [Yarn v1.19.1](https://yarnpkg.com/)
- Emulador Android [emulador](https://www.genymotion.com/)
- React Native CLI [react-native-cli](https://github.com/react-native-community/cli)
- Backend do Gympoint rodando.

## Instruções

```bash
# download / Clone o repositório:

git clone https://github.com/mateus0h/gympoint/gympoint-mobile.git

# entrar na pasta do projeto
cd gympoint-mobile

# instalando as dependências do package.json:
yarn install

# Habilitar a comunicação do emulador com (API, reactotron)
adb reverse tcp:9090 tcp:9090

# instalar App Mobile no emulador (ANDROID)
yarn react-native run-android


# inicializar App Mobile
react-native start
```