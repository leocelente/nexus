# PLACOPAS
Mantainer: Leonardo Celente
## Resumo
Projeto de uma plataforma de acompanhamento e benchmark de propriedades agrícolas através de indicadores da iniciativa Nexus. Um aplicativo web capaz de agregar dados de propriedades, visualiza-los para analise e 
calcular um benchmark comparando os efeitos de práticas.

## Mais detalhes
Para entender mais sobre o projeto e como ele foi implementado veja a [Wiki](https://github.com/leocelente/nexus/wiki).

## Como executar:
O projeto foi construido com o `create-react-app` logo pode ser executado com:
```bash
 $ npm install
 $ npm start
```

O projeto está atualmente hosteado na plataforma Firebase Hosting do Google, 
então com o pacote `firebase-tools` é possivel fazer um deploy:

```bash
 $ npm run build
 $ firebase deploy --public build
```
